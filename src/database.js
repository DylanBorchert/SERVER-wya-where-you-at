const mysql = require('promise-mysql');

require('dotenv').config()

const connectToDatabase = async () => {

    return await mysql.createPool({

        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        host: process.env.DB_HOST, // e.g. '127.0.0.1'
        port: process.env.DB_PORT, // e.g. '3306'

        //Specify additional properties here.
        connectionLimit: 5,
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        waitForConnections: true, // Default: true
        queueLimit: 0, // Default: 0
    });
};

module.exports.setup = connectToDatabase;