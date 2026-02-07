import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
      docs: defineCollection({
        source: {
            cwd: process.env.WPNUXT_PATH ?? undefined,
            repository: !process.env.WPNUXT_PATH ? 'https://github.com/wpnuxt/wpnuxt/tree/main' : undefined,
            include: 'docs/content/**/*',
            exclude: ['docs/content/**/*.json'],
            prefix: '/'
          },
        type: 'page',
        schema: z.object({
          title: z.string(),
          description: z.string(),
          content: z.string()
        })
      })
    }
  })