// Require
const express = require("express")
const cors = require("cors")

// Constants/Variables
const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use(require("../routes/login/login_v1.js"))
app.use(require("../routes/register/register_v1.js"))

app.listen(PORT, () => {
    console.log("START_EXPRESS", PORT)
})