const conn = require('../config/connect')

module.exports = {
  getPoint: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_point LEFT JOIN tb_users ON tb_point.id_user = tb_users.id_user ORDER BY point DESC', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  getPointMe: (id_user) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_point LEFT JOIN tb_users ON tb_point.id_user = tb_users.id_user WHERE tb_point.id_user = ?', id_user ,(err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  insertPoint: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_point SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  updatePoint: (id_point, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_point SET ? WHERE id_point=?', [data, id_point], (err, result) => {
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