const productModel = require("../models/product");
const help = require("../helpers/helpers");
const cloudinary = require('cloudinary')

module.exports = {
  getProductALL: (req, res) => {
    let search = req.query.search
    
    productModel
      .getProductALL(search)
      .then(result=> {
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  postProduct: async (req, res) => {
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
    const data = {
      product_name: req.body.product_name,
      price: req.body.price,
      id_category: req.body.id_category,
      img: await getUrl()
    };
    productModel
      .postProduct(data)
      .then(result => {
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateProduct: async (req, res) => {
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
    const id_product = req.params.id_product;
    const data = {
      product_name: req.body.product_name,
      price: req.body.price,
      id_category: req.body.id_category,
      img: await getUrl(),
      updated_at: new Date()
    };
    productModel
      .updateProduct(id_product, data)
      .then(result => {
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
};
