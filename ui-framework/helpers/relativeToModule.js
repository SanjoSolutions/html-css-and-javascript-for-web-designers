export function relativeToModule(url, path) {
  return new URL(path, url).toString()
}
