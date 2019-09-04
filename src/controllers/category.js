const catModel = require('../models/category')
const help = require('../helpers/helpers')

const jwt = require('jsonwebtoken')

module.exports = { 
  getCat: (req,  res) => {
    catModel
      .getCat()
      .then(result => {
        help.response(res, result, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  postCat: async (req, res) => {
    const data = {
      id_category: null,
      category_name: req.body.category_name,
      
    }
    console.log('ini data bro', data)
    catModel
      .postCat(data)
      .then(result => {
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  getUserMe: (req,  res) => {
    userModel
      .getUserMe()
      .then(resultUser => {
        help.response(res, resultUser, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  registrasiUser: async (req, res) => {
    const path = req.file.path
    const getUrl = async req => {
        cloudinary.config({
            cloud_name: 'downloadaplikasi27',
            api_key: '592491942836456',
            api_secret: 'JrxDNmYINgcFFuD0_nsoRhUnjw0'    
        })
  
        let dataimg
        await cloudinary.uploader.upload(path, result => {
          console.log('coba ini', path)
          // const fs = require('fs')
          // fs.unlink(path)
          dataimg = result.url
        })
        return dataimg
      }
    const salt = help.generateSalt(18)
    const passwordHash = help.setPassword(req.body.password, salt)
    const data = {
      id_user: null,
      username: req.body.username,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      full_name: req.body.full_name,
      level_user: 1,
      img_profile: await getUrl()
    }
    console.log('ini data bro', data)
    userModel
      .registrasiUser(data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertUser: (req, res) => {
    const salt = help.generateSalt(18)
    const passwordHash = help.setPassword(req.body.password, salt)
    const data = {
      id_ktp: req.body.id_ktp,
      nama_peminjam: req.body.nama_peminjam,
      jk: req.body.jk,
      alamat: req.body.alamat,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      status: 1,
      level_user: 'peminjam'
    }

    userModel
      .insertUser(data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  loginUser: (req, res) => {
    const username = req.body.username
    const password = req.body.password

    userModel
      .getByUsername(username)
      .then(result => {
        const dataUser = result[0]
        const usePassword = help.setPassword(password, dataUser.salt)
          .passwordHash
        console.log('ini dia', usePassword)

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign(
            {
              id_ktp: dataUser.id_ktp
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
          )

          delete dataUser.salt
          delete dataUser.password

          return help.response(res, dataUser, 200)
        } else {
          return help.response(res, null, 403, 'Wrong email & password!')
        }
      })
      .catch(() => {
        return help.response(res, null, 403, 'No email & password!')
      })
  },
  updateUser: (req, res) => {
    const id_ktp = req.params.id_ktp
    const data = {
      id_ktp: req.body.id_User,
      nama_peminjam: req.body.nama_peminjam,
      alamat: req.body.alamat
    }
    userModel
      .updateUser(id_ktp, data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, [id_ktp, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteUser: (req, res) => {
    const id_ktp = req.params.id_ktp

    userModel
      .deleteUser(id_ktp)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, id_ktp)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
