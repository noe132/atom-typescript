import {addCommand} from "./registry"
import {
  CodeEdit,
  commandForTypeScript,
  formatCode,
  LocationRangeQuery,
  rangeToLocationRange,
} from "../utils"

addCommand("atom-text-editor", "typescript:format-code", deps => ({
  description: "Format code in currently active text editor",
  async didDispatch(e) {
    if (!commandForTypeScript(e)) {
      return
    }

    const editor = e.currentTarget.getModel()
    if (!editor) {
      e.abortKeyBinding()
      return
    }
    const filePath = editor.getPath()
    if (!filePath) {
      e.abortKeyBinding()
      return
    }
    const ranges: LocationRangeQuery[] = []

    for (const selection of editor.getSelectedBufferRanges()) {
      if (!selection.isEmpty()) {
        ranges.push(rangeToLocationRange(selection))
      }
    }

    // Format the whole document if there are no ranges added
    if (ranges.length === 0) {
      const end = editor.buffer.getEndPosition()
      ranges.push({
        line: 1,
        offset: 1,
        endLine: end.row + 1,
        endOffset: end.column + 1,
      })
    }

    const client = await deps.getClient(filePath)
    const edits: CodeEdit[] = []

    // Collect all edits together so we can update everything in a single transaction
    for (const range of ranges) {
      const result = await client.executeFormat({...range, file: filePath})
      if (result.body) {
        edits.push(...result.body)
      }
    }

    if (edits.length > 0) {
      editor.transact(() => {
        formatCode(editor, edits)
      })
    }
  },
}))
