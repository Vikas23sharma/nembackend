const express = require("express")
const { connection } = require("./db")
require("dotenv").config()
const cors = require("cors")
const { userRouter } = require("./routes/User.routes")
const { postRouter } = require("./routes/Post.routes")
const { auth } = require("./middleware/auth.middleware")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)

app.use(auth)
app.use("/posts", postRouter)




app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("SUccessfully connected to the DB")
    } catch (error) {
        console.log(error)
        console.log("something went wrong while connecting to the DB")
    }
    console.log(`server is running at port ${process.env.port}`)
})