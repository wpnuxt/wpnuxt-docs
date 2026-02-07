# WPNuxt Docs

Documentation site for the WPNuxt project (WordPress + Nuxt 4 via GraphQL).

## Stack

- **Nuxt 4** with **Docus** (`extends: ['docus']`)
- **Nuxt UI v4** with Tailwind CSS v4
- **Nuxt Content v3** - docs sourced from the [wpnuxt/wpnuxt](https://github.com/wpnuxt/wpnuxt) monorepo
- **MCP toolkit** (`@nuxtjs/mcp-toolkit`) - exposes an MCP server at `/mcp`
- **pnpm** package manager

## Project Structure

```
app/
  app.config.ts          # Nuxt UI theme, header/footer/toc config
  assets/css/main.css    # Tailwind imports, custom colors, component styles
  components/            # Vue components (AppHeaderLogo.vue)
content/
  index.md               # Homepage (uses UPageHero, UPageSection, UPageFeature)
content.config.ts        # Content collections (remote source from GitHub)
nuxt.config.ts           # Nuxt config, route rules, MCP, runtime config
server/                  # Server routes (MCP endpoints)
```

## Design

- **Primary color**: `reefgold` (golden/olive palette)
- **Secondary color**: `woodsmoke` (dark neutral palette)
- **Font**: DM Sans
- Custom CSS classes: `hero-dot-pattern` (homepage hero background), `feature-card` (bordered cards with hover)
- All styling uses Nuxt UI CSS variables (`--ui-*`) for automatic light/dark mode support
- Component theming via `app.config.ts` `ui` key (pageHero, pageFeature slots)

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm generate   # Static generation
pnpm preview    # Preview production build
```

## Key Patterns

- Use **Nuxt UI components** and their `app.config.ts` theme overrides for styling
- Use **Nuxt UI CSS variables** (`--ui-border`, `--ui-bg-elevated`, etc.) rather than hardcoded colors
- Homepage content is in `content/index.md` using MDC syntax with Nuxt UI components
- Docs content is pulled from the remote `wpnuxt/wpnuxt` repo via `content.config.ts`
- Environment variables: `NUXT_WORDPRESS_URL`, `WPNUXT_PATH` (local content override)
