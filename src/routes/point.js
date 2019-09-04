const express = require('express')
const Route = express.Router()

const pointController = require('../controllers/point')
const Auth = require('../helpers/auth')

Route 
  .all('/*', Auth.authInfo)
  .get('/', pointController.getPoint)
  .get('/me/:id_users', pointController.getPointMe)
  .patch(`/:id_point`, pointController.updatePoint)
  .post(`/`, pointController.insertPoint)
//   .patch(`/:id_ktp`, pointController.updateUser)
//   .delete(`/:id_ktp`, pointController.deleteUser)

module.exports = Route
