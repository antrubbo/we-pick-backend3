const generateAccessToken = (user) => {
    const _id = user.id
    const payload = {
        sub: _id,
        iat: Date.now()
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

module.exports = { generateAccessToken }