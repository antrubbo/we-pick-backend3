const express = require("express")
const router = express.Router()

const movies = require("../controllers/moviesController.js")
const { authenticateToken } = require("../helpers/authenticateToken")

router.get("/", movies.getByTitle)
// authenticateToken takes in the token in the Authorization Header and verifies it - not needed here, just for testing - it works!
// still unsure of how passport fits into this scenario
router.get("/all", authenticateToken, movies.getAllMovies)
// router.post("/", movies.create)
router.post("/add-to-list", movies.addToList)
router.get("/popular", movies.getPopular)
router.get("/:id", movies.findOrCreate)

module.exports = router