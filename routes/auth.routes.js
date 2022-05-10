const express = require("express")
const router = express.Router()

const auth = require("../controllers/authController.js")

router.post("/", auth.authenticateToken)

module.exports = router