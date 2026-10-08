// Single source of truth for the content security policy. Delivered two
// ways: this meta tag in Base.astro and the Content-Security-Policy header
// in public/_headers and docker/nginx.conf. The security test fails if
// they drift apart.
export const CSP =
  "default-src 'self'; script-src 'self' 'sha256-Q0c3WPpsOy9ZtBiFQSJAFz4TIa4pEYE3TzAqW9fXC5I=' 'sha256-oS/WirwNfIb6HADwFqzvSdkofjGd+MoF4zVjt0uhBNY='; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests"
