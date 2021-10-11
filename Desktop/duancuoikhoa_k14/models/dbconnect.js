const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

if (process.env.db_refconnect == undefined) {
  console.log("không tìm thấy env");
} else {
  mongoose.connect(
    process.env.db_refconnect,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
}

module.exports = mongoose;
