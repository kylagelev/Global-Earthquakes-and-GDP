import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
  client: new sqlite3.Database('test.db')
});
exporter.all(function (err, all) {
// 
});