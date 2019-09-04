const express = require("express");
const Route = express.Router();

const productController = require("../controllers/product");
const Auth = require("../helpers/auth");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  }, 
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

let upload = multer({ storage: storage }); 

Route
  .get("/", productController.getProductALL)
  .post(`/`, upload.single('img'), productController.postProduct)
  .patch(`/:id_product`,upload.single('img'), productController.updateProduct)

//   .patch(`/:id_ktp`, productController.updateUser)
//   .delete(`/:id_ktp`, productController.deleteUser)

module.exports = Route;
