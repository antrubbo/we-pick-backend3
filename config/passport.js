require("dotenv").config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require("../models");
const User = db.Users;

const accessToken = process.env.ACCESS_TOKEN_SECRET

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessToken,
    // algorithms: ['RS256'] - is this needed to specify?
}

const strategy = new JwtStrategy(options, async (payload, done) => {
    let user = await User.findByPk(payload.sub)
    try {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
})

module.exports = (passport) => {
    passport.use(strategy)
}