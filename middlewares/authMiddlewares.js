const jwt = require("jsonwebtoken");
const User=require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "sean has a secret", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/signup");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "sean has a secret", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth ,checkUser};
