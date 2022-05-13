const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req, res) => {
    res.send("WePick Homepage")
})

const db = require("./models");
db.sequelize.sync();

const movieRoutes = require("./routes/movie.routes.js")
app.use("/api/movies", movieRoutes)
const userRoutes = require("./routes/user.routes.js")
app.use("/api/users", userRoutes)
const authRoutes = require("./routes/auth.routes.js")
app.use("/api/auth", authRoutes)

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"})
})

module.exports = app