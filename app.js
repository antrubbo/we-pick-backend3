const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
// passport - 

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