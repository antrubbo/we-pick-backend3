const express = require("express")
const cors = require("cors")
const app = express()
const passport = require('passport');
// Pass the global passport object into the configuration function

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Pass the global passport object into the configuration function
require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("WePick Homepage")
})

const db = require("./models");
db.sequelize.sync();

const movieRoutes = require("./routes/movie.routes.js")
app.use("/api/movies", movieRoutes)
const userRoutes = require("./routes/user.routes.js")
app.use("/api/users", userRoutes)

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"})
})

module.exports = app