# Production image: build the static site, then serve it from nginx.
# The result is a few MB and has no Node runtime in it.

# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app

# Copy manifests first so `npm ci` is cached until dependencies actually change
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Serve from the domain root here, unlike the GitHub Pages build which lives
# under /spring-learning-platform/. Must be "/" and not "": CRA treats an empty
# string as unset and falls back to the `homepage` field, which 404s every asset.
ENV PUBLIC_URL="/"
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/conf.d/security-headers.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
