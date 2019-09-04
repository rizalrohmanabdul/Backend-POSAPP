const transModel = require("../models/transaksi");
const help = require("../helpers/helpers");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = {
  // getPoint: (req, res) => {
  //   pointModel
  //     .getPoint()
  //     .then(resultPoint => {
  //       help.response(res, resultPoint, 200);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  // getPointMe: (req, res) => {
  //   const id_users = req.params.id_users;
  //   pointModel
  //     .getPointMe(id_users)
  //     .then(resultPoint => {
  //       help.response(res, resultPoint, 200);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  insertCart: (req, res) => {
    const data = {
      id_trans:  'X',
      tgl_trans: new Date(),
      id_kasir: req.body.id_kasir,
      id_product: req.body.id_product,
      qty: req.body.qty,
      status: req.body.status
    };
    transModel
      .insertCart(data)
      .then(result => {
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  insertTrans: (req, res) => {
    const date = new Date()
    const ID = 'INV'+ date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    const cetak_data = {
      id_trans:  'X',
      tgl_trans: new Date(),
      id_kasir: req.body.id_kasir,
      id_product: req.body.id_product,
      qty: req.body.qty
    };
    const msg = {
      to: 'downloadaplikasi27@gmail.com',
      from: 'kasir@posapp.com',
      subject: 'Terima Kasih Telah Membeli Di Toko Kami',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    const data = {
      id_trans:  ID,
      status: 'sukses'
    };
    transModel
      .insertTrans(data)
      .then(result => {
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updatePoint: (req, res) => {
    const id_point = req.params.id_point;
    const data = {
      point: req.body.point
    };
    pointModel
      .updatePoint(id_point, data)
      .then(resultPoint => {
        const result = resultPoint;
        help.response(res, result, 200, [id_point, data]);
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
