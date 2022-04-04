
require("dotenv").config();
const path = require("path");

const express      = require("express");
const cors         = require("cors");
const cookieParser = require("cookie-parser");
const logger       = require("morgan");
const passport     = require("passport");

const indexRouter = require("./routes/index");
const authRouter  = require("./routes/auth");

const app = express();

// setup basic logging
app.use(logger("dev"));

// route csr
app.use(cors());

// handle/parse client input in `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // use `qs`
app.use(cookieParser());

// // send static content
app.use(express.static(path.join(__dirname, "../build")));
// app.use("/", indexRouter);


// setup token autentication
app.use(passport.initialize());
require("./config/passport-jwt-strategy")(passport);
app.use("/auth", authRouter);


// setup graphql server `express-graphql`
const { graphqlHTTP } = require("express-graphql");
const schema          = require("./config/graphql/schema");
const rootValue       = require("./config/graphql/resolvers");
const { verifyToken } = require("./mw/verify-token");

app.use(
  "/graphql",
  verifyToken,
  graphqlHTTP({ 
    schema,
    rootValue,
    graphiql: true,
  }));

// // @feathersjs
// //  setup services to rest
// //  and realtime sockets
// app.configure(express.rest());
// app.configure(socketio());
// // mount a service
// app.use("/messages", new Service());
// app.use(express.errorHandler());
// // access a service: app.service("service-name") { .find .create .on } 
//
// // setup sockets
// app.on("connection", cli => {
//   // auto-subscribe all connections to `public` channel
//   app.channel("public").join(cli);
// });

// // subscribe a function to get channel(s) to publish to
// app.publish(() => app.channel("public"));



//
module.exports = app;

// mongodb://127.0.0.1
