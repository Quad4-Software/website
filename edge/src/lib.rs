#![forbid(unsafe_code)]

//! quad4.io served from a Wasm component. Static assets are embedded at
//! build time; the handler mirrors docker/nginx.conf routing (directory
//! indexes, no redirects) and applies the security headers parsed from
//! public/_headers.

mod generated {
    include!(concat!(env!("OUT_DIR"), "/assets.rs"));
}

pub use generated::{Asset, ASSETS, SECURITY_HEADERS};

const MEDIA_EXT: &[&str] = &["woff", "woff2", "webp", "png", "ico", "svg", "jpg", "jpeg"];

/// Look up an embedded asset by its exact path.
pub fn find(path: &str) -> Option<&'static Asset> {
    ASSETS.iter().find(|a| a.path == path)
}

/// Map a request path to an asset. Bare paths resolve to their directory
/// index (/projects -> /projects/index.html) without a redirect. Anything
/// else returns None and the caller serves the 404 page.
pub fn resolve(path: &str) -> Option<&'static Asset> {
    let path = if path == "/" { "/index.html" } else { path };
    if let Some(a) = find(path) {
        return Some(a);
    }
    let dir = path.trim_end_matches('/');
    find(&format!("{dir}/index.html"))
}

/// Cache tiers, mirroring the nginx locations: hashed build assets are
/// immutable, media caches for 30 days, everything else revalidates.
pub fn cache_for(path: &str) -> &'static str {
    if path.starts_with("/_astro/") {
        "public, max-age=31536000, immutable"
    } else if MEDIA_EXT.iter().any(|e| path.ends_with(&format!(".{e}"))) {
        "public, max-age=2592000"
    } else {
        "no-cache"
    }
}

#[cfg(target_family = "wasm")]
mod edge {
    use wstd::http::body::Body;
    use wstd::http::{Error, Method, Request, Response, StatusCode};

    use crate::{cache_for, find, resolve, SECURITY_HEADERS};

    #[wstd::http_server]
    async fn main(request: Request<Body>) -> Result<Response<Body>, Error> {
        let head = *request.method() == Method::HEAD;
        if *request.method() != Method::GET && !head {
            return respond(
                StatusCode::METHOD_NOT_ALLOWED,
                b"method not allowed",
                "text/plain",
                "no-cache",
                head,
            );
        }
        let path = request.uri().path().to_owned();
        match resolve(&path) {
            Some(asset) => respond(
                StatusCode::OK,
                asset.data,
                asset.mime,
                cache_for(asset.path),
                head,
            ),
            None => {
                let nf = find("/404.html");
                respond(
                    StatusCode::NOT_FOUND,
                    nf.map(|a| a.data).unwrap_or(b"404 not found"),
                    "text/html",
                    "no-cache",
                    head,
                )
            }
        }
    }

    fn respond(
        status: StatusCode,
        data: &'static [u8],
        mime: &str,
        cache: &str,
        head: bool,
    ) -> Result<Response<Body>, Error> {
        let body = if head {
            Body::empty()
        } else {
            Body::from(data)
        };
        let mut builder = Response::builder()
            .status(status)
            .header("content-type", mime)
            .header("cache-control", cache);
        for (name, value) in SECURITY_HEADERS {
            builder = builder.header(*name, *value);
        }
        Ok(builder.body(body)?)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn asset_paths_are_absolute_and_unique() {
        let mut seen = std::collections::HashSet::new();
        for a in ASSETS {
            assert!(a.path.starts_with('/'), "{}", a.path);
            assert!(seen.insert(a.path), "duplicate asset {}", a.path);
        }
    }

    #[test]
    fn resolves_index_and_directory_index() {
        if find("/index.html").is_none() {
            return; // stub table when dist/ is absent
        }
        assert_eq!(resolve("/").unwrap().path, "/index.html");
        assert_eq!(resolve("/projects").unwrap().path, "/projects/index.html");
        assert_eq!(resolve("/projects/").unwrap().path, "/projects/index.html");
    }

    #[test]
    fn misses_and_traversal_return_none() {
        assert!(resolve("/does-not-exist").is_none());
        assert!(resolve("/../etc/passwd").is_none());
        assert!(resolve("//..//..//etc/passwd").is_none());
    }

    #[test]
    fn cache_tiers() {
        assert!(cache_for("/_astro/app.js").contains("immutable"));
        assert!(cache_for("/og.webp").contains("2592000"));
        assert_eq!(cache_for("/index.html"), "no-cache");
    }

    #[test]
    fn security_headers_include_csp() {
        assert!(SECURITY_HEADERS
            .iter()
            .any(|(k, v)| *k == "content-security-policy" && v.contains("default-src 'self'")));
    }
}
