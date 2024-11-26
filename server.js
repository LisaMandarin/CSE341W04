require("dotenv").config()
const express = require("express")
const { auth } = require("express-openid-connect")

const app = express()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}

app.use(auth(config))
app.get("/", (req, res) => {
    console.log("isAuthenticated: ", req.oidc.isAuthenticated())
    console.log("user: ", req.oidc.user)
    res.send(req.oidc.isAuthenticated()? "Logged in" : "Logged out")
})

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on the port http://localhost:${port}`))