const { UserModel } = require("../models/User.model")
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

//Register User

userRouter.post("/register", async (req, res) => {
    const { email, name, pass, gender } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({ email, name, gender, pass: hash })
            await user.save()
            res.status(200).send({ "msg": "New user registered successfully" })
        });
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

// Login User

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id, user: user.name }, 'social');
                    res.status(200).send({ "msg": "Login Successful", "token": token })
                }
            });
        }
        else {
            res.status(200).send({ "msg": "Wrong Credentials" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

module.exports = { userRouter }