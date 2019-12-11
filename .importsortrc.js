const path = require('path')

module.exports = {
  ".js, .jsx, .es6, .es, .mjs, .ts, .tsx": {
    "parser": "babylon",
    "style": path.join(__dirname, "lib")
  }
}