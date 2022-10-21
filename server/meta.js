import { writeFileSync, readFileSync } from "fs";

const project = JSON.parse(readFileSync('package.json', 'utf8'))


const output = [
  'export default {',
  `version: "${project.version}",`,
  `buildAt: "${new Date().toISOString()}",`,
  `platform: "${process.platform}",`,
  `}`
]

writeFileSync('./src/metadata.ts', output.join('\n'));