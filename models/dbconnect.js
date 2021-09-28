const mongoose = require("mongoose");
require("dotenv").config({path: "../env"});
if (process.env.db_ref == undefined){
  console.log('not found env');
}else{
mongoose.connect(
  process.env.db_ref_connect,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
}
module.exports = mongoose;
