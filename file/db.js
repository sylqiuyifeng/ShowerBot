const sqlite3 = require('sqlite3');
const settings = require('../setting.json');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../', settings.fileDb));
module.exports.db = db;
module.exports.close = function () {
    return new Promise((res, rej)=>db.close((err)=>err?rej(err):res()));
}