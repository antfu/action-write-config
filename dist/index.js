"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _fs = require('fs');
var _path = require('path');
var _io = require('@actions/io');
var _core = require('@actions/core');
var _jsyaml = require('js-yaml'); var _jsyaml2 = _interopRequireDefault(_jsyaml);
main().catch((error) => _core.setFailed.call(void 0, error.message));
async function main() {
  try {
    const path2 = _core.getInput.call(void 0, "path", {required: true}).trim();
    const data = _core.getInput.call(void 0, "data", {required: true});
    let format = _core.getInput.call(void 0, "format") || "auto";
    if (format === "auto") {
      const {ext} = _path.parse.call(void 0, path2.toLowerCase());
      format = ext === ".json" ? "json" : ext === ".yaml" || ext === ".yml" ? "yaml" : "unknown";
    }
    if (!["json", "yaml"].includes(format)) {
      _core.setFailed.call(void 0, `Unsupported format "${format}"`);
      return;
    }
    const content = format === "json" ? JSON.stringify(data, null, 2) : _jsyaml2.default.safeDump(data, {indent: 2});
    await _io.mkdirP.call(void 0, _path.dirname.call(void 0, path2));
    await _fs.promises.writeFile(path2, `${content}
`);
  } catch (error) {
    _core.setFailed.call(void 0, error.message);
  }
}
