
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connection.once("open", 
  () => console.log("conection:mongoose"));

mongoose
  .connect(process.env.MONGODB_URI);

mongoose.model(
  process.env.MONGODB_COLLECTION_USERS,
  new mongoose.Schema(
    {
      name         : String,
      email        : String,
      passwordHash : String,
    },
    {
      timestamps: true,
    }
  ));

mongoose.model(
    process.env.MONGODB_COLLECTION_ITEMS, 
    new mongoose.Schema({
        title       : String,
        description : String,
        user_id     : {
          type     : mongoose.Schema.Types.ObjectId,
          required : true, 
          ref      : process.env.MONGODB_COLLECTION_USERS,      
        },
    }, {
        timestamps: true,
    }));

// mongoose.model(
//   process.env.MONGODB_COLLECTION_REFRESH_TOKENS, 
//   new mongoose.Schema({
//     token: {
//       type: String,
//       index: true,
//     },
//   }));



module.exports = { mongoose };
