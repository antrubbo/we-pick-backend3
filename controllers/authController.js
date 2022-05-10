const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(" ")[1]
    const { token } = req.body
    if (!token) return res.sendStatus(401)

    //this verifies that our token (ACCESS_TOKEN_SECRET) matches the incoming one
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    res.send("A-OK")
}

module.exports = { authenticateToken }