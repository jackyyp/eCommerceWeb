//return file name for the json file without db
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);       