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
  const toolName = 'wss-unified-agent.jar'
  try {
    const downloadPath = await tc.downloadTool(downloadUrl)
    const cachedPath = await tc.cacheFile(
      downloadPath,
      toolName,
      'wss-unified-agent',
      version
    )
    return `${cachedPath}/${toolName}`
  } catch (err) {
    throw err
  }
}

function composeVersionPath(version: string): string {
  return 'latest' === version
    ? `https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar`
    : `https://github.com/whitesource/unified-agent-distribution/releases/download/v${version}/wss-unified-agent.jar`
}

export function sanitizeVersion(version: string): string {
  if (version.startsWith('v')) {
    core.info(`Slicing away the 'v' from ${version}`)
    return version.substring(1, version.length).trimRight()
  } else {
    return version.trim()
  }
}
