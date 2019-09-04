const conn = require('../config/connect')

module.exports = {
  getCat: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_category', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  postCat: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO  tb_category SET ?', data, (err, result) => {
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