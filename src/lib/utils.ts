import { extname } from 'path'

// combine css
export function cc(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

// get HH:MM from a date object
export function getTime(d: Date) {
  return d.toLocaleTimeString('en-sg', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// remove file extension from a path
export function stripExtension(f: string) {
  return f.replace(new RegExp(extname(f) + '$'), '')
}

// check if file is a markdown or mdx file
export function isMarkdown(f: string) {
  return f.match(/\.md(x?)$/)
}

// converts string-like input to a string
export function stringify(s: string | string[] | undefined): string {
  return (typeof s === 'string' ? [s] : s ? s : []).join(' ')
}
