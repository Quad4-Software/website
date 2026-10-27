# syntax=docker/dockerfile:1

# Static site: unprivileged nginx serving static files on 8080.
FROM docker.io/nginxinc/nginx-unprivileged:1.31.7-alpine3.24-slim@sha256:a8cb0f33d51fa107c96fd2bd3a71aaf564ec131e9d2bdf8700944f0ed8b170d7

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=101:101 . /usr/share/nginx/html

LABEL org.opencontainers.image.title="Quad4 Website" \
  org.opencontainers.image.description="Static site for quad4.io" \
  org.opencontainers.image.url="https://quad4.io" \
  org.opencontainers.image.source="https://github.com/Quad4-Software/quad4-website" \
  org.opencontainers.image.vendor="Quad4" \
  org.opencontainers.image.documentation="https://github.com/Quad4-Software/quad4-website"

EXPOSE 8080
USER 101:101

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
