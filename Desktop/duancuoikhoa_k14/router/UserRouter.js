const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/db_mongoose");
const bcrypt = require("bcrypt");
const Check = require("../controllers/checkAuth");
const BlackListModel = require("../models/backlist");

router.get("/", Check.checkAdmin, async (req, res) => {
  const showUser = await UserModel.accountmodel.find();
  if (showUser) {
    return res.json(showUser);
  }
});

router.get("/pagination", async (req, res) => {
  try {
    if (req.query.class) {
      const data = await UserModel.find({ class: req.query.class })
        .skip((req.query.page - 1) * req.query.size)
        .limit(req.query.size * 1);
      res.json({ data, status: 200, mess: "ok" });
    } else {
      const data = await UserModel.find({})
        .skip((req.query.page - 1) * req.query.size)
        .limit(req.query.size * 1);
      res.json({ data, status: 200, mess: "ok" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.get("/:id", (req, res) => {
  UserModel.accountmodel
    .findOne({ _id: req.params.id })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const checkuser = await UserModel.accountmodel.findOne({
      username: req.body.username,
    });
    if (checkuser) {
      res.json({ status: 400, mess: "Error username" });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newuser = await UserModel.accountmodel.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: "",
        phone: "",
        createdAt: Date.now().toString(),
      });
      if (newuser) {
        res.json({ status: 200, mess: "success" });
      }
    }
  } catch (error) {
    console.log(500);
    res.json({ status: 500, mess: "Error server" });
  }
});

router.put("/:id", (req, res) => {
  UserModel.updateOne(
    {
      username: req.body.username,
      _id: req.params.id,
      password: req.body.password,
    },
    { password: req.body.newPass }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await UserModel.accountmodel.findOne({
      username: req.body.username,
    });
    if (checkUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (checkUser) {
        const token = jwt.sign({ id: checkUser._id }, "Auth", {
          expiresIn: "30d",
        });
        res.json({ status: 200, id: token, mess: "ok" });
      } else {
        res.json({ status: 400, mess: "sai password" });
      }
    } else {
      res.json({ status: 400, mess: "sai username" });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/checkLogin", async (req, res) => {
  try {
    if (req.cookies.user) {
      const token = req.cookies.user;
      const checkToken = await BlackListModel.findOne({ token });
      if (checkToken) {
        res.json({ mess: "cookie bị hạn chế", status: 400 });
      } else {
        const id = jwt.verify(token, "Auth").id;
        const checkUser = await UserModel.accountmodel.findOne({ _id: id });
        if (checkUser) {
          return res.json({ mess: "user da dang nhap", id, status: 200 });
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
});

router.post("/logout", async (req, res) => {
  try {
    await BlackListModel.create({ token: req.cookies.user });
    res.json({ status: 200, mess: "ok" });
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

module.exports = router;
