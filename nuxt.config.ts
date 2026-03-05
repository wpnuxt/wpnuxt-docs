export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['@nuxtjs/plausible'],

  css: ['~/assets/css/main.css'],

  site: {
    name: 'WPNuxt',
    url: 'https://wpnuxt.com'
  },

  app: {
    head: {
      meta: [
        { property: 'og:image', content: 'https://wpnuxt.com/wpnuxt.png' },
        { name: 'twitter:image', content: 'https://wpnuxt.com/wpnuxt.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },

  // Runtime config for MCP WordPress connection
  runtimeConfig: {
    // WordPress GraphQL endpoint (set via NUXT_WORDPRESS_URL env var)
    wordpressUrl: '',
    // Optional: WordPress Application Password for authenticated requests
    wordpressAppUser: '',
    wordpressAppPassword: '',
    // Package version (used by wpnuxt_init to set @wpnuxt/core dependency)
    wpnuxtVersion: '2.0.0'
  },

  // Hybrid rendering: static docs, dynamic MCP
  routeRules: {
    // MCP endpoints need server-side rendering
    '/mcp/**': { ssr: true },
    '/sse': { ssr: true },

    // Redirects: old /docs/* structure → new root structure
    '/docs/getting-started/configuration': { redirect: { to: '/reference/configuration', statusCode: 301 } },
    '/docs/getting-started/composables': { redirect: { to: '/reference/composables', statusCode: 301 } },
    '/docs/getting-started/images': { redirect: { to: '/guide/images', statusCode: 301 } },
    '/docs/getting-started/authentication': { redirect: { to: '/auth', statusCode: 301 } },
    '/docs/advanced/performance': { redirect: { to: '/guide/caching', statusCode: 301 } },
    '/docs/advanced/composables-api': { redirect: { to: '/reference/composables', statusCode: 301 } },
    '/docs/cheat-sheet': { redirect: { to: '/reference/composables', statusCode: 301 } },
    '/docs/localdev/localwp': { redirect: { to: '/guide/local-development', statusCode: 301 } },
    '/docs/localdev/**': { redirect: { to: '/guide/local-development', statusCode: 301 } },
    '/docs/getting-started': { redirect: { to: '/getting-started', statusCode: 301 } },
    '/docs/getting-started/installation': { redirect: { to: '/getting-started/installation', statusCode: 301 } },
    '/docs/getting-started/wordpress-setup': { redirect: { to: '/getting-started/wordpress-setup', statusCode: 301 } },
    '/docs/getting-started/quick-start': { redirect: { to: '/getting-started/quick-start', statusCode: 301 } },
    '/docs/guide/**': { redirect: { to: '/guide', statusCode: 301 } },
    '/docs/deploy/**': { redirect: { to: '/deploy/vercel', statusCode: 301 } },
    '/docs/migration/**': { redirect: { to: '/migration/v1-to-v2', statusCode: 301 } },
    '/docs/reference/**': { redirect: { to: '/reference/configuration', statusCode: 301 } },
    '/docs/auth/**': { redirect: { to: '/auth', statusCode: 301 } },
    '/docs/ai/**': { redirect: { to: '/ai', statusCode: 301 } },
    '/docs/**': { redirect: { to: '/getting-started', statusCode: 301 } },
    '/docs': { redirect: { to: '/getting-started', statusCode: 301 } }
  },

  // Enable async context for Nitro request handling
  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-02-16',

  // Force exit after build - workaround for @modelcontextprotocol/sdk keeping process alive
  hooks: {
    close: () => {
      setTimeout(() => process.exit(0), 1000)
    }
  },

  llms: {
    domain: 'https://wpnuxt.com'
  },

  plausible: {
    apiHost: 'https://wpnuxt.com/plio'
  },

  mcp: {
    name: 'WPNuxt',
    browserRedirect: '/ai'
  },

  ogImage: {
    enabled: false
  },

  pwa: {
    enabled: false
  },

  // Disable syntax highlighting to avoid shiki dependency issues
  mdc: {
    highlight: false
  },

  // Ensure minimark is included in Vercel serverless bundle
  nitro: {
    externals: {
      traceInclude: ['node_modules/minimark/dist/stringify.mjs']
    }
  }
})
