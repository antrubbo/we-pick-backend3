const express = require("express")
const router = express.Router()

const users = require("../controllers/usersController.js")

router.get("/", users.index)
router.post("/", users.create)
router.post("/login", users.login)
router.get("/:id", users.getById)
router.put("/:id", users.update)
router.delete("/:id", users.deleteOne)

module.exports = router