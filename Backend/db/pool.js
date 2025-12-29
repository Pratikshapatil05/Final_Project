const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "10.238.112.217",
  user: "collab",
  password: "Collab@123",
  database: "dummy",
  timezone: "Z",
  dateStrings: true
});

module.exports = pool;
