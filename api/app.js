
require("dotenv").config();

const express      = require("express");
const cors         = require("cors");
// const path = require("path");
const cookieParser = require("cookie-parser");
const logger       = require("morgan");
const passport     = require("passport");

const indexRouter = require("./routes/index");
const authRouter  = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


app.use(passport.initialize());
(require("./config/passport-jwt-strategy"))(passport);


const { graphqlHTTP } = require("express-graphql");
const schema          = require("./config/config-graphql");
app.use("/graphql", 
    graphqlHTTP({ 
        schema, 
        graphiql: true,
    }));


app.use("/", indexRouter);
app.use("/auth", authRouter);

module.exports = app;

// mongodb://127.0.0.1