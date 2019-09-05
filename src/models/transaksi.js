const conn = require('../config/connect')
const isEmpty = require('lodash.isempty');
module.exports = {
  getTrans: (search, day, week, month, year) => {
    if (!isEmpty(search)) {
      console.log('cari per id Trans', search)
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir WHERE tb_trans.id_trans LIKE '%${search}%'`
    }else if(!isEmpty(day)) {
      console.log('day', day, month)
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir WHERE day(tgl_trans) = '${day}' AND month(tgl_trans) = '${month}'`
    }else if (!isEmpty(week) && isEmpty(day)) {
      console.log('week', month, year)
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir WHERE yearweek(tgl_trans) = yearweek(NOW()) AND MONTH(tgl_trans) = '${month}' AND YEAR(tgl_trans) = '${year}'`
    }else if (!isEmpty(month) && isEmpty(week)) {
      console.log('month', month, year)
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir WHERE MONTH(tgl_trans) = '${month}' AND YEAR(tgl_trans) = '${year}'`
    }
    else if(!isEmpty(year)){
      console.log('year', year)
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir WHERE year(tgl_trans) = '${year}'`
    }else{
      console.log('all')
      var sql = `SELECT * FROM tb_trans INNER JOIN tb_product ON tb_trans.id_product = tb_product.id_product INNER JOIN tb_kasir ON tb_trans.id_kasir = tb_kasir.id_kasir`
    }
    return new Promise((resolve, reject) => {
      conn.query(sql , (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  insertCart: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_trans SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  insertTrans: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE tb_trans SET ? WHERE status='cart'`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
}