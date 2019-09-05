const conn = require('../config/connect')

module.exports = {
  getByEmail: (email) => {
    console.log('x', email)
    const newDate = new Date()
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_kasir WHERE kasir_user=?', email, (err, result) => {
            console.log(email);
            conn.query('UPDATE tb_kasir SET	login_at = ? WHERE kasir_user=?',[newDate, email], (err, result) => {
              console.log(result)
            })
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
},
  insertKasir: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_kasir SET ? ', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  updateSoundNow: (id_sound) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_sound SET sound_status= 1 WHERE id_sound=?',id_sound, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  updateSoundOld: (id_sound, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_sound SET sound_status= 0 WHERE id_sound=?', id_sound, (err, result) => {
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