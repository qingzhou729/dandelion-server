const mysql = require('mysql');
const dbConf = require('./../config/dbConf');
const pool = mysql.createPool({
  host: dbConf.host,
  user: dbConf.user,
  password: dbConf.password,
  database: dbConf.database,
})

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = {
    query,
}

