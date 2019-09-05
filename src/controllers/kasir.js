const kasirModel = require("../models/kasir");
const help = require("../helpers/helpers");
const jwt = require('jsonwebtoken')

module.exports = {
  getByEmail: (req, res) => {
    const email = req.body.kasir_user || ""
    const password = req.body.password || ""
    kasirModel.getByEmail(email)
        .then((result) => {
            if (result.length > 0) {
                const dataMitra = result[0]
                const mitraPassword = help.setPassword(password, dataMitra.salt).passwordHash
                if (mitraPassword === dataMitra.password) {
                    dataMitra.token = jwt.sign({
                        userid: dataMitra.id
                    }, 'x', { expiresIn: '1h' })
                    delete dataMitra.salt
                    delete dataMitra.password
                    return res.json(dataMitra)
                } else {
                    res.json('Password Salah')
                }
            } else {
                res.json("Email Tidak Terdaftar")
            }
        })
        .catch((error) => {
            console.log(error)
        })
},
  insertKasir: (req, res) => {
    const date = new Date()
    const ID = 'KSR'+ date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    const salt = help.generateSalt(18)
    const password = help.setPassword(req.body.password, salt)
    const data = {
      kasir_user: ID,
      kasir_name: req.body.kasir_name,
      password: password.passwordHash,
      salt: salt,
    };
    console.log(data)
    kasirModel
      .insertKasir(data)
      .then(result => {
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateSoundNow: (req, res) => {
    const id_sound = req.params.id_sound;
    soundModel
      .updateSoundNow(id_sound)
      .then(resultSound => {
        const result = resultSound;
        help.response(res, result, 200, id_sound);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateSoundOld: (req, res) => {
    const id_sound = req.params.id_sound;
    soundModel
      .updateSoundOld(id_sound)
      .then(resultSound => {
        const result = resultSound;
        help.response(res, result, 200, id_sound);
      })
      .catch(error => {
        console.log(error);
      });
  },
  deleteUser: (req, res) => {
    const id_ktp = req.params.id_ktp;

    userModel
      .deleteUser(id_ktp)
      .then(resultUser => {
        const result = resultUser;
        help.response(res, result, 200, id_ktp);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
