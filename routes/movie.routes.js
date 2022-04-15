const express = require("express")
const router = express.Router()

const movies = require("../controllers/moviesController.js")

router.get("/", movies.getByTitle)
router.get("/all", movies.getAllMovies)
// router.post("/", movies.create)
router.post("/add-to-list", movies.addToList)
router.get("/popular", movies.getPopular)
router.get("/:id", movies.findOrCreate)

module.exports = router