
require("dotenv").config();
const graphql = require("graphql");

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = graphql;


const { mongoose } = require("./db");
const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);
const Item = mongoose.model(process.env.MONGODB_COLLECTION_ITEMS);

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({

    id           : { type: GraphQLID },
    name         : { type: new GraphQLNonNull(GraphQLString) },
    email        : { type: new GraphQLNonNull(GraphQLString) },
    passwordHash : { type: new GraphQLNonNull(GraphQLString) },

    items: {
        type: new GraphQLList(ItemType),
        resolve(parent, args) {
            return Item.find({user_id: parent.id});
        }
    }
  }),
});

const ItemType = new GraphQLObjectType({
  name: "item",
  fields: () => ({

    id          : { type: GraphQLID },
    title       : { type: new GraphQLNonNull(GraphQLString) },
    description : { type: new GraphQLNonNull(GraphQLString) },
    user_id     : { type: new GraphQLNonNull(GraphQLID) },

    author: {
        type: UserType,
        resolve(parent, args) {
            return User.findById(parent.user_id);
        },
    }
  }),
});


const mutation = new GraphQLObjectType({
    name: "mutation", 
    fields: {
        addUser: {
            type: UserType,
            args: {
                name         : {type: GraphQLString},
                email        : {type: GraphQLString},
                passwordHash : {type: GraphQLString},
            },
            resolve(parent, args) {
                const user = new User({...args});
                return user.save();
            }
        },
        addItem: {
            type: ItemType, 
            args: {
                title      : { type: GraphQLString },
                description: { type: GraphQLString },
                user_id    : { type: GraphQLID },
            },
            resolve(parent, args) {
                const item = new Item({...args});
                return item.save();
            }
        }
    }
})


// access endpoint
const RootQuery = new GraphQLObjectType({
  
  name: "RootQueryType",

  fields: {

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve( parent, args ) {
        return User.findById(args.id);
      }
    },
    users: { 
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return User.find();
        }
    },

    item: {
        type: ItemType, 
        args: {id: { type: GraphQLID }}, 
        resolve(parent, args) {
            return Item.findById(args.id);
        }
    },
    items: { 
        type: new GraphQLList(ItemType),
        resolve(parent, args) {
            return Item.find();
        }
    }

  },

});

module.exports = 
  new GraphQLSchema({ query: RootQuery, mutation });

