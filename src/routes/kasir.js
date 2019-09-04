const express = require("express");
const Route = express.Router();

const kasirController = require("../controllers/kasir");
const Auth = require("../helpers/auth");

Route
  // .get("/", kasirController.getSound)
  // .get("/now/", kasirController.getSoundNow)
  .post(`/`, kasirController.insertKasir)
  // .patch(`/now/:id_sound`, kasirController.updateSoundNow)
  // .patch(`/old/:id_sound`, kasirController.updateSoundOld)

//   .patch(`/:id_ktp`, patternController.updateUser)
//   .delete(`/:id_ktp`, patternController.deleteUser)

module.exports = Route;
