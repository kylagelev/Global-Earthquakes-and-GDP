var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('earthquake_db_schemata.db');

    data = `SELECT * from quake`

    db.get(data, (err,row) =>{
        if (err) {
            return console.error(err.message);
          }
        else {
            return row
        console.log(`${row.Place}`)

        }

    })


// db.close

//need to 

