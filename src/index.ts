import { promises as fs } from 'fs'
import { dirname, parse } from 'path'
import { mkdirP } from '@actions/io'
import { getInput, setFailed } from '@actions/core'
import YAML from 'js-yaml'

main().catch(error => setFailed(error.message))

async function main() {
  try {
    const path: string = getInput('path', { required: true }).trim()
    const data = getInput('data', { required: true })
    let format = getInput('format') || 'auto'

    if (format === 'auto') {
      const { ext } = parse(path.toLowerCase())
      format = ext === '.json'
        ? 'json'
        : (ext === '.yaml' || ext === '.yml')
          ? 'yaml'
          : 'unknown'
    }

    if (!['json', 'yaml'].includes(format)) {
      setFailed(`Unsupported format "${format}"`)
      return
    }

    const content = format === 'json'
      ? JSON.stringify(data, null, 2)
      : YAML.safeDump(data, { indent: 2 })

    await mkdirP(dirname(path))
    await fs.writeFile(path, `${content}\n`)
  }
  catch (error) {
    setFailed(error.message)
  }
}
