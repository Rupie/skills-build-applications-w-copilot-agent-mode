// server.ts — Codespaces and localhost helper
// Example Codespaces preview URL: https://<CODESPACE_NAME>-8000.app.github.dev

const CODESPACE = process.env.CODESPACE_NAME
const PORT = Number(process.env.PORT) || 8000

// Build preview URL when in Codespaces, otherwise localhost
export function getApiUrl() {
  if (CODESPACE) {
    return `https://${CODESPACE}-${PORT}.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

// Expose values for other modules/tests
export const codespaceName = CODESPACE
export const apiPreviewHostSuffix = `-${PORT}.app.github.dev`

// Debug log when run directly
if (require.main === module) {
  console.log('CODESPACE_NAME:', CODESPACE)
  console.log('API URL:', getApiUrl())
}

export default getApiUrl
