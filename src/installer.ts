import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

export async function getUnifiedAgent(version: string): Promise<string> {
  let toolPath: string
  toolPath = tc.find('wss-unified-agent', version)

  if (!toolPath) {
    toolPath = await downloadUnifiedAgent(version)
  }

  return toolPath
}

async function downloadUnifiedAgent(version: string): Promise<string> {
  const sanitizedVersion = sanitizeVersion(version)
  const downloadUrl = composeVersionPath(sanitizedVersion)
  core.info(`Downloading ${downloadUrl}`)

  try {
    const downloadPath = await tc.downloadTool(downloadUrl)
    return await tc.cacheFile(
      downloadPath,
      'wss-unified-agent.jar',
      'wss-unified-agent',
      version
    )
  } catch (err) {
    throw err
  }
}

function composeVersionPath(version: string): string {
  return 'latest' === version
    ? `https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar`
    : `https://github.com/whitesource/unified-agent-distribution/releases/download/v${version}/wss-unified-agent.jar`
}

function sanitizeVersion(version: string): string {
  return version.startsWith('v')
    ? version.substring(1, version.length - 1).trimRight()
    : version.trim()
}
