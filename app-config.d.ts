// Augments the Docus / Nuxt UI AppConfig schema with the custom keys this
// project uses in app/app.config.ts. Without these declarations TypeScript
// rejects keys like `ui.colors.secondary`, `seo.siteName`, `header.search`
// and `toc.wpnuxt` even though they are read at runtime.

interface ProjectAppConfigInput {
  ui?: {
    colors?: {
      primary?: string
      secondary?: string
      success?: string
      info?: string
      warning?: string
      error?: string
      neutral?: string
    }
    content?: Record<string, unknown>
    header?: Record<string, unknown>
    pageHero?: Record<string, unknown>
    footer?: {
      slots?: {
        bottom?: {
          left?: string
          wrapper?: string
          [key: string]: unknown
        }
        [key: string]: unknown
      }
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  seo?: {
    siteName?: string
    titleTemplate?: string
    title?: string
    description?: string
  }
  header?: {
    title?: string
    search?: boolean
    colorMode?: boolean
    logo?: {
      alt?: string
      light?: string
      dark?: string
    }
    links?: Array<{
      icon?: string
      to?: string
      target?: string
      ariaLabel?: string
    }>
  }
  toc?: {
    title?: string
    wpnuxt?: {
      title?: string
      links?: Array<{
        icon?: string
        iconClass?: string
        label?: string
        to?: string
        target?: string
      }>
    }
    bottom?: {
      title?: string
      links?: Array<{
        icon?: string
        label?: string
        to?: string
        target?: string
      }>
    }
  }
}

declare module 'nuxt/schema' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppConfigInput extends ProjectAppConfigInput {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CustomAppConfig extends ProjectAppConfigInput {}
}

declare module '@nuxt/schema' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppConfigInput extends ProjectAppConfigInput {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CustomAppConfig extends ProjectAppConfigInput {}
}

export {}
