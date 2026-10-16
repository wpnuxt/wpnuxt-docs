# wpnuxt.com as a Node server, deployed on Coolify (.github/workflows/ci.yml).
# The docs content is fetched from github.com/wpnuxt/wpnuxt at build time (content.config.ts),
# so content changes need a rebuild of this image.

FROM node:24-slim AS build
WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
RUN corepack enable

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

ENV NUXT_SOURCEMAPS=false \
    NODE_OPTIONS=--max-old-space-size=4096
# Docus only builds its AI assistant when AI_GATEWAY_API_KEY is set at build time. It just checks
# that the key exists, so a placeholder keeps the real key out of the image; the real one is set
# at runtime.
RUN AI_GATEWAY_API_KEY=build-time-placeholder pnpm run build && \
    test -f .output/server/index.mjs

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
# Nuxt Content restores its SQLite database into .data/ on first request, so /app must be writable
RUN chown node:node /app
COPY --from=build --chown=node:node /app/.output ./.output
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
USER node
CMD ["node", ".output/server/index.mjs"]
