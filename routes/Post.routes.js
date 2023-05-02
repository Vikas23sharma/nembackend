const express = require("express")
const { PostModel } = require("../models/Post.model")

const postRouter = express.Router()

postRouter.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({ "msg": "Post added successfully" })
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

postRouter.get("/", async (req, res) => {
    try {
        const note = await PostModel.find({ userID: req.body.userID })
        res.status(200).send(note)
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

postRouter.patch("/update/:postID", async (req, res) => {
    const { postID } = req.params
    const post = await PostModel.findOne({ _id: postID })
    try {
        if (req.body.userID !== post.userID) {
            res.status(200).send({ "msg": "Not Authorised action!" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: postID }, req.body)
            res.status(200).send({ "msg": "Post Edited Successfully!" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

postRouter.delete("/delete/:postID", async (req, res) => {
    const { postID } = req.params
    const post = await PostModel.findOne({ _id: postID })
    try {
        if (req.body.userID !== post.userID) {
            res.status(200).send({ "msg": "Not Authorised action!" })
        } else {
            await PostModel.findByIdAndDelete({ _id: postID })
            res.status(200).send({ "msg": "Post Deleted Successfully!" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

module.exports = { postRouter }