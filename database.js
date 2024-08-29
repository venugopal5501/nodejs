const sql = require('mssql');

var dbconfig = {
    server: 'DINCD-035',
    port: 1433,
    database: 'venugopal',
    user: 'Training',
    password: 'Training@123',
    trustServerCertificate: true
}

var connection = new sql.ConnectionPool(dbconfig);
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log("SQL server connected successfully");
    }
});
module.exports = connection;