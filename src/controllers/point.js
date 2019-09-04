const pointModel = require("../models/point");
const help = require("../helpers/helpers");

module.exports = {
  getPoint: (req, res) => {
    pointModel
      .getPoint()
      .then(resultPoint => {
        help.response(res, resultPoint, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getPointMe: (req, res) => {
    const id_users = req.params.id_users;
    pointModel
      .getPointMe(id_users)
      .then(resultPoint => {
        help.response(res, resultPoint, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  insertPoint: (req, res) => {
    const data = {
      id_user: req.body.id_user,
      point: req.body.point
    };
    pointModel
      .insertPoint(data)
      .then(resultPoint => {
        const result = resultPoint;
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
