const { mongoose } = require("../../db");
const escapeStringRegexp = require("../../../util/escape-string-regexp");

const Item = mongoose.model(process.env.MONGODB_COLLECTION_ITEMS);
const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);



const ITEMTYPE_FIELDS 
  = "_id title description image createdAt user";
const ITEMTYPE_FIELDS_NOUSER 
  = "_id title description image createdAt";
const ITEMTYPE_FIELDS_NOUSER_UPDATEDAT
  = "_id title description image createdAt updatedAt";

module.exports = {
  items: () => {
    return Item.find()
      .populate("user")
      .select(ITEMTYPE_FIELDS);
  },
  itemsByUser: ({ user }) => {
    return Item.find({ user })
      .select(ITEMTYPE_FIELDS_NOUSER);
  },
  item: ({ _id }) => {
    return Item.findById(_id)
      .populate("user")
      .select(ITEMTYPE_FIELDS);
  },
  createItem: (args) => {

    // adds to Item
    // and adds to user.items[]


    const item = new Item(args);

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
  editItem: ({post, title, description, image}) => {
    return Item.findByIdAndUpdate(post, { title, description, image })
      .select(ITEMTYPE_FIELDS_NOUSER_UPDATEDAT);
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
  countUserItems: ({ user }) => {
    // user <=> mongo ID{}
    // return Item.where({ user: _id }).countDocuments();
    return Item.countDocuments({ user });
  },
  searchItems: ({ term }) => {
    
    const rTerm = 
      new RegExp(`${escapeStringRegexp(term.toLowerCase())}`, 'i');
      
    return Item.find({ $or: [
      { title       : rTerm },
      { description : rTerm },
    ]})
    .populate("user")
    .select(ITEMTYPE_FIELDS);
  },
};
