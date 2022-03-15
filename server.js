const app = require("./app.js")
const { sequelize } = require("./models")

require("dotenv").config()
const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`)
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})