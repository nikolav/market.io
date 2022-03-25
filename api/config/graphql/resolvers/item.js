const { mongoose } = require("../../db");
const Item = mongoose.model(process.env.MONGODB_COLLECTION_ITEMS);
const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);

const ITEMTYPE_FIELDS = "_id title description image createdAt user";

module.exports = {
  items: () => {
    return Item.find()
      .populate("user")
      .select(ITEMTYPE_FIELDS);
  },
  item: ({ _id }) => {
    return Item.findById(_id)
      .populate("user")
      .select(ITEMTYPE_FIELDS);
  },
  createItem: (args) => {
    // adds to Item
    // and adds to user.items[]
    const item = new Item({
      // @todo, provide real user id
      // ...args, user: "623dfebab3408902ac322e7f",
      ...args
    });

    let createdItem = null;

    return item.save()
      .then(item => {
        createdItem = item;
        return User.findById(item.user);
      })
      .then(user => {
        user.items.push(createdItem);
        return user.save();
      })
      .then(user => createdItem);
  },
  dropItem: args => {
    // drops from Item
    // and delets from user.items[]
    let deletedItem = null;
    return Item.findByIdAndDelete(args._id)
      .then(item => {
        deletedItem = item;
        return User.findById(item.user);
      })
      .then(user => {
        user.items = user.items.filter(it => 
          it._id.toString() !== deletedItem._id.toString());
        return user.save();
      })
      .then(user => deletedItem);
  },
  countItems: () => {
    return Item.countDocuments();
  },
};
