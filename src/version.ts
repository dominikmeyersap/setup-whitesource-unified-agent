import {exec, ExecException} from 'child_process'

export async function shellCommand(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        reject(error)
      }
      if (stderr) {
        reject(new Error(stderr))
      }
      resolve(stdout)
    })
  })
}
