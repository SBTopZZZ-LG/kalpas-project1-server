// Require
const express = require("express")
const jwt = require("jsonwebtoken")
const Database = require("../../database")

// Middleware
const Router = express.Router()

Router.post("/", async (req, res, next) => {
    try {
        const postData = req.body

        // Post data
        const email = postData["email"]
        const password = postData["password"]
        const passwordConf = postData["passwordConf"]

        if (!email || !password || !passwordConf)
            return res.status(400).send({
                error: "insufficientInformation",
                result: null
            })

        if (password !== passwordConf)
            return res.status(400).send({
                error: "passwordConfirmationFailed",
                result: null
            })

        if (Database.get(email))
            return res.status(403).send({
                error: "emailAlreadyInUse",
                result: null
            })

        // Register success
        const signedPassword = jwt.sign(password, 's3C43t')
        Database.push(email, signedPassword)

        // Login success
        return res.status(200).send({
            error: null,
            result: "success"
        })
    } catch (e) {
        return res.status(500).send({
            error: "internalException",
            result: null
        })
    }
})

module.exports = Router