// Require
const express = require("express")
const jwt = require("jsonwebtoken")
const Database = require("../../database")

// Middleware
const Router = express.Router()

Router.post("/login", async (req, res, next) => {
    try {
        const postData = req.body

        // Post data
        const email = postData["email"]
        const password = postData["password"]

        if (!email || !password)
            return res.status(400).send({
                error: "insufficientInformation",
                result: null
            })

        if (!Database.get(email))
            return res.status(404).send({
                error: "emailNotFound",
                result: null
            })

        const signedPassword = jwt.sign(password, 's3C43t')
        if (Database.get(email) !== signedPassword)
            return res.status(403).send({
                error: "passwordMismatch",
                result: null
            })

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