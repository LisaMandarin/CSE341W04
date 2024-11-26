require("dotenv").config()
const express = require("express")

const app = express()

app.get("/", (req, res) => res.send("Hi"))

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on the port http://localhost:${port}`))