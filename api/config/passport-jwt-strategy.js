require("dotenv").config();

const { Strategy, ExtractJwt } = require("passport-jwt");

const { mongoose } = require("./db");
const User         = mongoose.model(process.env.MONGODB_COLLECTION_USERS);

const jwtConfig = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey    : process.env.SECRETORKEY,

  // algorithms: ['RS256'],

  jsonWebTokenOptions: {
    maxAge: 10 * 24 * 60 * 60,
  },
};

module.exports = passport =>
  passport.use(
    new Strategy(
      
      jwtConfig,

      // verifyCallback
      (payload, done) => {
        // payload == { _id: <token> }
        User.findById(payload._id, 
          (error, user) => {

            if (error) return done(error, false);
            if (!user) return done(null, false);

            return done(null, user);
        });
      }

    )
  );
