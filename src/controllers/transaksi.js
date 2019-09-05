const transModel = require("../models/transaksi");
const help = require("../helpers/helpers");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = {
  getTrans: (req, res) => {
    let search = req.query.search
    let day = req.query.day
    let week = req.query.week
    let month = req.query.month
    let year = req.query.year
    
    transModel
      .getTrans(search, day, week, month, year)
      .then(result => {
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
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
      from: 'rizalrohman@ex.com',
      subject: 'Undangan Interview di PT Mandiri',
      text: 'Dear Anja Putro Prayogo, A.Md.Kom  ',
      html: '<strong>Kami beritahukan Bahwa nama anda telah terlibat interview dan harus datang ke kantor kami pada hari minggu, kalau gk hadir awas lu gua golok</strong>',
    };
    sgMail.send(msg).then(result => {
      help.response(res, result, 200, data);
    })
    .catch(error => {
      console.log(error);
    });
    const data = {
      id_trans:  ID,
      status: 'sukses'
    };
    // transModel
    //   .insertTrans(data)
    //   .then(result => {
    //     help.response(res, result, 200, data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
