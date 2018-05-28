import * as path from "path"

export const extractTsFromVue = (fileContent: string) => {
  let isInScript = false

  const content = fileContent.split("\n").map((line) => {
    if (line.match(/^<script.*?lang=('|")ts('|").*?/)) {
      isInScript = true
      return ""
    }
    if (line.indexOf("</script>") === 0) {
      isInScript = false
    }
    if (isInScript) {
      return line
    }
    return ""
  }).join("\n")

  return content
}

export const isVueFile = (filePath: string | undefined) => {
  if (filePath === undefined) return false
  return path.extname(filePath) === ".vue"
}
