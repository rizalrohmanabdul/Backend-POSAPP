const express = require('express')
const Route = express.Router()

const transController = require('../controllers/transaksi')
const Auth = require('../helpers/auth')

Route 
  // .all('/*', Auth.authInfo)
  
  // .get('/me/:id_users', pointController.getPointMe)
  // .patch(`/:id_point`, pointController.updatePoint)
  .get('/', transController.getTrans)
  .post(`/cart/`, transController.insertCart)
  .post(`/trans/`, transController.insertTrans)
//   .patch(`/:id_ktp`, pointController.updateUser)
//   .delete(`/:id_ktp`, pointController.deleteUser)

module.exports = Route
