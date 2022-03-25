require("dotenv").config();

var { Router } = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const passport = require("passport");

const { mongoose } = require("../config/db");

var router = Router();
const User = mongoose.model(process.env.MONGODB_COLLECTION_USERS);

// cache for refresh tokens
const tokens_ = {};


router.get("/user", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    return res.json({ user: {
      _id       : req.user._id,
      name      : req.user.name, 
      email     : req.user.email, 
    }});
  });

router.post("/login", (req, res, next) => {

  // check `user` exists in db
  //   else status.401
  // jwt.compare passwords, req.body.password, user.passwordHash
  //   if no match status.401
  // token = jwt.sign { _id } +expiresIn
  // res.json({token}), status(200)

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {

      if (!user)
        return res.sendStatus(401);
      
      bcrypt.compare(password, user.passwordHash, 
        (error, valid) => {

          if (error)
            return res.sendStatus(400);
          
          if (!valid)
            return res.sendStatus(403);
          
          const payload       = { _id: user._id };
          const token         = signPayload_(payload);
          const token_refresh = signRefreshToken_(payload);

          // cache a token to enable refresh
          tokens_[token_refresh] = 1;

          return res.json({ 
            token, 
            token_refresh, 
            _id       : user._id,
            name      : user.name, 
            email     : user.email,
          });
          
        });

    });
  });

// register client
// send generated token
router.post("/register", (req, res, next) => {

  // verify no user exists in db
  //   else status/403;
  // create user{ passwordHash }
  // dbSave record
  // fetch saved user's `_id` 
  //   jwt.sign token with { _id } +expiresIn
  // send token to client, status/201

  const { name, email, password } = req.body;

  User.findOne({ name, email })
    .then(user => {

      if (user) 
        return res.sendStatus(403);
      
      bcrypt.genSalt(10, 
        (error, salt) => {

          if (error) 
            return res.sendStatus(500);
          
          bcrypt.hash(password, salt, 
            (error, passwordHash) => {

              if (error)
                return res.sendStatus(500);
              
              const newUser = new User({ name, email, passwordHash });
              newUser.save();

              const payload       = { _id: newUser._id };
              const token         = signPayload_(payload);
              const token_refresh = signRefreshToken_(payload);
              
              return res.status(201).json({ 
                token, 
                token_refresh, 
                _id       : newUser._id,
                name      : newUser.name, 
                email     : newUser.email, 
               });

            });
        });
    });
  });

// enable token refresh
router.post("/token", (req, res, next) => {

  const { token } = req.body;
  
  // no refresh if it is requested withot a 
  // 'white hat' token in tokens_{}
  if (!token)
    return res.sendStatus(401);
  if (!(token in tokens_))
    return res.sendStatus(403);
  
  jwt.verify(token, process.env.SECRETORKEY, 
    (error, payload) => {

      if (error)
        return res.sendStatus(403);
      
      const token = signPayload_({ _id: payload._id });

      return res.json({ token });
    });
  
});

// disable token refresh
router.delete("/logout", (req, res, next) => {
  const { token } = req.body;
  delete tokens_[token];
  return res.sendStatus(200);});


module.exports = router;


//
function signPayload_ (payload) {
  return jwt.sign(payload, 
    process.env.SECRETORKEY, { expiresIn: 10 * 24 * 60 * 60 }); // sec.
}
function signRefreshToken_ (payload) {
  return jwt.sign(payload, process.env.SECRETORKEY);
}