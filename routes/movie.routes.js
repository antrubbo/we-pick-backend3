const express = require("express")
const router = express.Router()

const movies = require("../controllers/moviesController.js")

router.get("/", movies.getByTitle)
router.post("/", movies.create)
router.post("/add-to-list", movies.addToList)
router.get("/:id", movies.getById)
router.get("/popular", movies.getPopular)

module.exports = router