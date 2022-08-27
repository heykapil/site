import { resolve } from 'path'
import { lstatSync, readdirSync } from 'fs'

export const getAllFiles = (root: string, ignore: string[] = []) => {
  const allFiles: string[] = []
  const ls = (cwd: string) => {
    readdirSync(cwd)
      .filter((x) => !ignore.includes(x))
      .forEach((file) => {
        const fp = resolve(cwd, file)
        if (lstatSync(fp).isDirectory()) {
          ls(resolve(cwd, file))
        } else {
          allFiles.push(fp)
        }
      })
  }
  ls(root)
  return allFiles
    .map((p) => p.replace(root + '/', ''))
    .filter((entry) => entry !== '')
}

export const getFiles = (root: string, ignore: string[] = []) => {
  const files: string[] = []
  const ls = (cwd: string) =>
    readdirSync(cwd)
      .filter((x) => !ignore.includes(x))
      .forEach((file) => files.push(resolve(cwd, file)))
  ls(root)
  return files
    .map((p) => p.replace(root + '/', ''))
    .filter((entry) => entry !== '')
}
