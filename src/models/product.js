const conn = require('../config/connect')
const isEmpty = require('lodash.isempty');

module.exports = {
  getProductALL: (search) => {
    console.log('cari', search)
    if (!isEmpty(search)) {
      var sql = `SELECT * FROM tb_product INNER JOIN tb_category ON tb_product.id_category = tb_category.id_category WHERE tb_product.product_name LIKE '%${search}%'`
    }else {
      var sql = `SELECT * FROM tb_product INNER JOIN tb_category ON tb_product.id_category = tb_category.id_category ORDER BY tb_product.id_product DESC`
    }
    return new Promise((resolve, reject) => {
      conn.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  postProduct: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (id_product, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_product SET ? WHERE id_product=?', [data, id_product], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  getUserMe: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_users WHERE id_user = ?',id,  (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  registrasiUser: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_users SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  
  getByUsername: (username) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_users WHERE username = ?', username, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateUser: (id_user, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_users SET ? WHERE id_user=?', [data, id_user], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  deleteUser: (id_user) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM tb_users WHERE id_user=?', id_user, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}