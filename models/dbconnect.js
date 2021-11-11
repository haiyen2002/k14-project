const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.dyn71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

module.exports = mongoose;