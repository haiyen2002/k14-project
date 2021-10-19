const bcrypt = require("bcrypt");
const { accountmodel, BlackListModel } = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

module.exports.regiser = async (req, res) => {
    try {
        const checkUser = await accountmodel.findOne({
          username: req.body.username,
        });
        if (checkUser) {
          res.json({ status: 400, mess: "username đã sử dung" });
        } else {
          req.body.pass = await bcrypt.hash(req.body.pass, 10);
          await accountmodel.create({
            username: req.body.user,
            password: req.body.pass,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            phone: req.body.Phone,
            gender: req.body.Genner,
            email: req.body.Email,
            birthday: req.body.Birthday,
          });
          res.json({ status: 200, mess: "tao tk thanh cong" });
        }
      } catch (error) {
        res.json({
          status: 500,
          error,
          mess: "Ban chua nhap du thong tin hoac loi server",
        });
      }
}

module.exports.login = async (req, res) =>{
    try {
        const checkUser = await accountmodel.findOne({
          username: req.body.user,
        });
        if (checkUser) {
          const checkPassword = await bcrypt.compare(
            req.body.pass,
            checkUser.password
          );
          if (checkPassword) {
            const token = jwt.sign({ id: checkUser._id }, "team", {
              expiresIn: "30d",
            });
            res.json({
              status: 200,
              data: checkUser,
              mess: "Đăng nhập thành công",
              id: token,
            });
          } else {
            res.json({ status: 400, mess: "sai password" });
          }
        } else {
          res.json({ status: 400, mess: "sai username" });
        }
      } catch (error) {
        res.json({ error, mess: "server error", status: 500 });
      }
}

module.exports.checkLogin = async (req, res) => {
    try {
      if (req.cookies.user) {
        const token = req.cookies.user;
        const checkToken = await BlackListModel.findOne({ token });
        if (checkToken) {
          res.json({ mess: "cookie bị hạn chế", status: 400 });
        } else {
          const id = jwt.verify(token, "team").id;
          const checkUser = await accountmodel.findOne({ _id: id });
          if (checkUser) {
            res.json({ mess: "user da dang nhap", status: 200, data: checkUser });
          } else {
            res.json({ mess: "cookie khong hop le", status: 400 });
          }
        }
      } else {
        res.json({ mess: "chua dang nhap", status: 400 });
      }
    } catch (error) {
      res.json({ error, mess: "server error", status: 500 });
    }
  };

  module.exports.logout = async (req, res) => {
    try {
      await BlackListModel.create({ token: req.cookies.user });
      res.json({ status: 200, mess: "out" });
    } catch (error) {
      res.json({ error, mess: "server error", status: 500 });
    }
  }
