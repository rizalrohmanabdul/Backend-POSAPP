const express = require("express");
const Route = express.Router();

const soundController = require("../controllers/sound");
const Auth = require("../helpers/auth");

Route.all("/*", Auth.authInfo)
  .get("/", soundController.getSound)
  .get("/now/", soundController.getSoundNow)
  .post(`/`, soundController.insertSound)
  .patch(`/now/:id_sound`, soundController.updateSoundNow)
  .patch(`/old/:id_sound`, soundController.updateSoundOld)

//   .patch(`/:id_ktp`, patternController.updateUser)
//   .delete(`/:id_ktp`, patternController.deleteUser)

module.exports = Route;
