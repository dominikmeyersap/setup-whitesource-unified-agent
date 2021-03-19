import * as core from '@actions/core'
import * as installer from './installer'
import {shellCommand} from './version'

async function run(): Promise<void> {
  try {
    const uaVersion: string = core.getInput('unified-agent-version') || 'latest'
    core.debug(`Using Unified Agent in version: ${uaVersion}`)
    const toolPath = await installer.getUnifiedAgent(uaVersion)
    try {
      const version = await shellCommand(`java -jar ${toolPath} -v`)
      core.info(`Installed version info: ${version}`)
    } catch (err) {
      core.setFailed(err.message)
    }
    core.setOutput(`jar-path`, toolPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
