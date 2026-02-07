export default defineCachedEventHandler(async () => {
  const data = await $fetch<{ 'dist-tags': Record<string, string> }>('https://registry.npmjs.org/@wpnuxt/core', {
    headers: { Accept: 'application/vnd.npm.install-v1+json' }
  })

  return {
    version: data['dist-tags'].latest
  }
}, {
  maxAge: 60 * 60 // cache for 1 hour
})
