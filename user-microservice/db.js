const mongoose = require("mongoose");
/*

    connect
*/

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to %s", process.env.MONGODB_URL);
  })
  .catch((err) => {
    console.error("connection error: ", err.message);
    console.error("\n\nPlease make sure to set the MONGODB_URL env var \n\n");
    process.exit(1);
  });


module.exports =  mongoose.connection;
