const { mongoose } = require("../../db");
const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);

const USERTYPE_FIELDS = "_id name email createdAt items";

module.exports = {
  users: () => {
    return User.find()
      .populate("items")
      .select(USERTYPE_FIELDS);
  },
  user: ({ _id }) => {
    return User.findById(_id)
      .populate("items")
      .select(USERTYPE_FIELDS);
  },
  // dropUser: ({user}) => {
  //   return User.findByIdAndRemove(user)
  //     .select(USERTYPE_FIELDS);
  // },
  countUsers: () => {
    return User.countDocuments();
  },
};
