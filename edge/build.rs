//! Embeds the Astro build output (dist/) into the Wasm component and lifts
//! the security headers from public/_headers so CSP stays single-sourced.

use std::env;
use std::fs;
use std::path::{Path, PathBuf};

fn main() {
    let root = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap())
        .parent()
        .unwrap()
        .to_path_buf();
    let dist = root.join("dist");

    // Rebuild when site inputs change.
    println!("cargo:rerun-if-changed={}", dist.display());
    println!(
        "cargo:rerun-if-changed={}",
        root.join("public/_headers").display()
    );

    // Security headers: the /* block of public/_headers.
    let mut security: Vec<(String, String)> = Vec::new();
    let headers_src = fs::read_to_string(root.join("public/_headers")).expect("public/_headers");
    let mut in_main = false;
    for line in headers_src.lines() {
        if line.starts_with('/') {
            in_main = line.trim_end() == "/*";
            continue;
        }
        if in_main && !line.trim().is_empty() {
            let (k, v) = line.trim().split_once(':').expect("header line");
            security.push((k.trim().to_ascii_lowercase(), v.trim().to_string()));
        }
    }
    assert!(
        !security.is_empty(),
        "no /* headers parsed from public/_headers"
    );

    let mut assets: Vec<(String, PathBuf)> = Vec::new();
    if dist.is_dir() {
        collect(&dist, &dist, &mut assets);
    } else {
        println!("cargo:warning=dist/ missing; run `pnpm build` first. Embedding a stub 404 page.");
    }
    assets.sort();

    let mut out = String::new();
    out.push_str(
        "pub struct Asset {\n    pub path: &'static str,\n    pub mime: &'static str,\n    pub data: &'static [u8],\n}\n\n",
    );
    out.push_str("pub static ASSETS: &[Asset] = &[\n");
    for (path, file) in &assets {
        let abs = file.canonicalize().unwrap();
        out.push_str(&format!(
            "    Asset {{ path: {path:?}, mime: {:?}, data: include_bytes!({abs:?}) }},\n",
            mime_for(path),
        ));
        println!("cargo:rerun-if-changed={}", abs.display());
    }
    if assets.is_empty() {
        out.push_str(
            "    Asset { path: \"/404.html\", mime: \"text/html\", data: b\"404 not found\" },\n",
        );
    }
    out.push_str("];\n\npub static SECURITY_HEADERS: &[(&str, &str)] = &[\n");
    for (k, v) in &security {
        out.push_str(&format!("    ({k:?}, {v:?}),\n"));
    }
    out.push_str("];\n");

    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    fs::write(out_dir.join("assets.rs"), out).unwrap();
}

fn collect(dir: &Path, base: &Path, out: &mut Vec<(String, PathBuf)>) {
    for entry in fs::read_dir(dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().to_string();
        // Never embed host-metadata files or dotfiles. Directories like
        // _astro are still walked: they hold the hashed build output.
        if name.starts_with('.') || (!path.is_dir() && name.starts_with('_')) {
            continue;
        }
        if path.is_dir() {
            collect(&path, base, out);
        } else {
            let rel = path
                .strip_prefix(base)
                .unwrap()
                .to_string_lossy()
                .replace('\\', "/");
            out.push((format!("/{rel}"), path));
        }
    }
}

fn mime_for(path: &str) -> &'static str {
    match path.rsplit('.').next().unwrap_or("") {
        "html" => "text/html",
        "css" => "text/css",
        "js" | "mjs" => "text/javascript",
        "json" => "application/json",
        "webmanifest" => "application/manifest+json",
        "xml" => "application/xml",
        "txt" => "text/plain",
        "svg" => "image/svg+xml",
        "png" => "image/png",
        "webp" => "image/webp",
        "ico" => "image/x-icon",
        "woff" => "font/woff",
        "woff2" => "font/woff2",
        "wasm" => "application/wasm",
        _ => "application/octet-stream",
    }
}
