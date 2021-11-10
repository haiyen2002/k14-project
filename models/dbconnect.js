const mongoose = require("mongoose");
// require("dotenv").config({path: "../env"});
// if (db_refconnect == undefined){
//   console.log('not found env');
// }else{
mongoose.connect(
  // process.env.db_refconnect,
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.dyn71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

module.exports = mongoose;