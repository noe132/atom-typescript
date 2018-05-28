"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.extractTsFromVue = (fileContent) => {
    let isInScript = false;
    const content = fileContent.split("\n").map((line) => {
        if (line.match(/^<script.*?lang=('|")ts('|").*?/)) {
            isInScript = true;
            return "";
        }
        if (line.indexOf("</script>") === 0) {
            isInScript = false;
        }
        if (isInScript) {
            return line;
        }
        return "";
    }).join("\n");
    return content;
};
exports.isVueFile = (filePath) => {
    if (filePath === undefined)
        return false;
    return path.extname(filePath) === ".vue";
};
//# sourceMappingURL=vue.js.map