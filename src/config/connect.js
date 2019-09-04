require('dotenv').config()
const mysql = require('mysql') 
const conn = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'genSuLmduO',
  password: 'KHBA1rWctC',
  database: 'genSuLmduO'
})

conn.connect((err) => {
  if (err) console.log(`Eror From Connecton in file conn.js : ${err}`)
})

module.exports = conn