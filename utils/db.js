const mysql = require('mysql2');

const pool = mysql.createPool({
    host:process.env.sql_host,
    user:process.env.sql_user,
    database:process.env.sql_database,
    password:process.env.sql_password
})
module.exports =pool.promise();