const soundModel = require("../models/sound");
const help = require("../helpers/helpers");

module.exports = {
  getSound: (req, res) => {
    soundModel
      .getSound()
      .then(resultSound => {
        help.response(res, resultSound, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getSoundNow: (req, res) => {
    soundModel
      .getSoundNow()
      .then(resultSound => {
        help.response(res, resultSound, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  insertSound: (req, res) => {
    const data = {
      sound_name: req.body.sound_name,
      sound_file: 'Comming Soon',
      sound_status: 0
    };
    soundModel
      .insertSound(data)
      .then(resultSound => {
        const result = resultSound;
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
