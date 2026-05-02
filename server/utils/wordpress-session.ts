/**
 * WordPress Session Manager
 *
 * Manages the WordPress URL for the current MCP session using the
 * toolkit's built-in useMcpSession() for proper MCP-Session-Id support.
 */

interface WPSession {
  wordpressUrl: string
  siteName: string
  connectedAt: string
}

/**
 * Get the WordPress session data
 */
async function getWPSession() {
  return useMcpSession<WPSession>()
}

/**
 * Get the current WordPress session info
 */
export async function getWordPressSession(): Promise<{
  wordpressUrl: string | null
  siteName: string | null
  connectedAt: string | null
}> {
  try {
    const session = await getWPSession()
    const url = await session.get('wordpressUrl')
    if (!url) {
      return { wordpressUrl: null, siteName: null, connectedAt: null }
    }
    return {
      wordpressUrl: url,
      siteName: await session.get('siteName'),
      connectedAt: await session.get('connectedAt')
    }
  }
  catch {
    return { wordpressUrl: null, siteName: null, connectedAt: null }
  }
}

/**
 * Set the WordPress URL for the current session
 */
export async function setWordPressSession(
  wordpressUrl: string,
  siteName?: string
): Promise<void> {
  const session = await getWPSession()
  const normalizedUrl = wordpressUrl.replace(/\/+$/, '')
  await session.set('wordpressUrl', normalizedUrl)
  await session.set('siteName', siteName ?? '')
  await session.set('connectedAt', new Date().toISOString())
}

/**
 * Clear the WordPress session
 */
export async function clearWordPressSession(): Promise<void> {
  const session = await getWPSession()
  await session.clear()
}

/**
 * Get WordPress URL from session, header, or environment
 * Priority: Header > Session > Environment
 */
export async function getWordPressUrl(): Promise<string | null> {
  const event = useEvent()

  // 1. Check header first (explicit override)
  const headerUrl = getHeader(event, 'x-wordpress-url')
  if (headerUrl) {
    return headerUrl.replace(/\/+$/, '')
  }

  // 2. Check session
  try {
    const session = await getWPSession()
    const sessionUrl = await session.get('wordpressUrl')
    if (sessionUrl) {
      return sessionUrl
    }
  }
  catch {
    // Session not available (e.g. outside MCP context)
  }

  // 3. Fall back to environment
  const runtimeConfig = useRuntimeConfig()
  if (runtimeConfig.wordpressUrl) {
    return runtimeConfig.wordpressUrl.replace(/\/+$/, '')
  }

  return null
}

/**
 * Get session info for display
 */
export async function getSessionInfo(): Promise<{
  hasSession: boolean
  wordpressUrl: string | null
  siteName: string | null
  source: 'header' | 'session' | 'environment' | 'none'
  connectedAt: string | null
}> {
  const event = useEvent()
  const headerUrl = getHeader(event, 'x-wordpress-url')

  if (headerUrl) {
    return {
      hasSession: true,
      wordpressUrl: headerUrl.replace(/\/+$/, ''),
      siteName: null,
      source: 'header',
      connectedAt: null
    }
  }

  try {
    const session = await getWPSession()
    const url = await session.get('wordpressUrl')
    if (url) {
      return {
        hasSession: true,
        wordpressUrl: url,
        siteName: await session.get('siteName'),
        source: 'session',
        connectedAt: await session.get('connectedAt')
      }
    }
  }
  catch {
    // Session not available
  }

  const envUrl = useRuntimeConfig().wordpressUrl
  if (envUrl) {
    return {
      hasSession: true,
      wordpressUrl: envUrl.replace(/\/+$/, ''),
      siteName: null,
      source: 'environment',
      connectedAt: null
    }
  }

  return {
    hasSession: false,
    wordpressUrl: null,
    siteName: null,
    source: 'none',
    connectedAt: null
  }
}
