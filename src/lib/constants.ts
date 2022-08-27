import path from 'path'
import c from './constants.json'

const root = process.cwd()

const paths = Object.entries(c.paths).reduce(
  (a, [k, v]) => ({ ...a, [k]: path.resolve(root, v) }),
  {} as typeof c.paths
)

export const constants: typeof c = { ...c, paths }
