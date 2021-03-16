import * as core from '@actions/core'
import * as installer from './installer'

async function run(): Promise<void> {
  try {
    const uaVersion: string = core.getInput('unified-agent-version') || 'latest'
    core.debug(`Using Unified Agent in version: ${uaVersion}`)
    const toolPath = await installer.getUnifiedAgent(uaVersion)
    core.setOutput(`jar-path`, toolPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
