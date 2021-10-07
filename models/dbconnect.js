// const mongoose = require("mongoose");
// require("dotenv").config({path: "../env"});
// if (process.env.db_ref == undefined){
//   console.log('not found env');
// }else{
// mongoose.connect(
//   process.env.db_ref_connect,
//   { useNewUrlParser: true },
//   { useUnifiedTopology: true }
// );
// }
// module.exports = mongoose;

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ducnguyen:anhduc1230@cluster0.ts7cd.mongodb.net/TEST?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

module.exports = mongoose;
