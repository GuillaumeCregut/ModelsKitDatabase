require('dotenv').config();
const mysql = require('mysql2/promise');

const makeAdmin = async () => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });
    await connection.query(`use ${DB_NAME}`);
    const sql="UPDATE user SET rankUser=5 WHERE id=1"
    await connection.query(sql);
    connection.end();
};

try {
    makeAdmin();
  } catch (err) {
    console.error(err);
  }