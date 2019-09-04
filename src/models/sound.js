const conn = require('../config/connect')

module.exports = {
  getSound: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_sound', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  getSoundNow: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT sound_name FROM tb_sound WHERE sound_status = 1', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  insertSound: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_sound SET ? ', data, (err, result) => {
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