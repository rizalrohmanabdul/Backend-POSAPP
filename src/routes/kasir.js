const express = require("express");
const Route = express.Router();

const kasirController = require("../controllers/kasir");
const Auth = require("../helpers/auth");

Route
  
  .post(`/`, kasirController.insertKasir)
  .post('/login',kasirController.getByEmail)

module.exports = Route;
