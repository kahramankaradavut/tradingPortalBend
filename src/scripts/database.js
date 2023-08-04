const mysql = require("mysql2/promise");
const config = require("../config/database");

async function query(sql, params) {
  // console.log('config:', config.credentials);
  const connection = await mysql.createConnection(config.credentials);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {query};
