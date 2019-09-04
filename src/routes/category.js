const express = require('express')
const Route = express.Router()

const catController = require('../controllers/category')
const Auth = require('../helpers/auth')


Route 
  // .all('/*', Auth.authInfo)
  .get('/', catController.getCat)
  .post(`/inputcat`, catController.postCat)
  // .get('/me/:id', userController.getUserMe)
  // .post(`/`, userController.insertUser)
  // .post(`/register`,upload.single('img_profile'), userController.registrasiUser)
  // .post(`/login`, userController.loginUser)
  // .patch(`/:id_ktp`, userController.updateUser)
  // .delete(`/:id_ktp`, userController.deleteUser)

module.exports = Route
