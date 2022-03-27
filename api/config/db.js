require("dotenv").config();

const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => console.log("mongoose:ready"), 
    error => console.error(error));

mongoose.connection.once("open", 
  () => console.log("mongoose:conection"));

// const schemaConfig = {
//   autoIndex: false,  
//   collection: 'data', // name a collection
// };

mongoose.model(
  process.env.MONGODB_COLLECTION_USERS,
  new mongoose.Schema(
    {
      name  : String,
      email : String,

      items: [
        {
          type     : mongoose.Schema.Types.ObjectId,
          ref      : process.env.MONGODB_COLLECTION_ITEMS,
          required : true,
          default  : () => [],
        }
      ],

      passwordHash: String,
    },
    {
      timestamps: true,
    }
  )
);

mongoose.model(
  process.env.MONGODB_COLLECTION_ITEMS,
  new mongoose.Schema(
    {
      title: String,
      description: String,
      image: String,

      user: {
        type     : mongoose.Schema.Types.ObjectId,
        ref      : process.env.MONGODB_COLLECTION_USERS,
        required : true,
      },

      deletedAt: Date,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { mongoose };
