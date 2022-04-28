require("dotenv").config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const accessToken = process.env.ACCESS_TOKEN_SECRET

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessToken
}

const strategy = new JwtStrategy(options, async (payload, done) => {
    let user = await User.findByPk(id)
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