require("dotenv").config()
require("./mongo_db")
const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const { auth, requiresAuth } = require("express-openid-connect")

const app = express()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
}

app.use(auth(config))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res) => {
    console.log("isAuthenticated: ", req.oidc.isAuthenticated())
    res.send(req.oidc.isAuthenticated()? "Logged in" : "Logged out")
})

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2))
})

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on the port http://localhost:${port}`))