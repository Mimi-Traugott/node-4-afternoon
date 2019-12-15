require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require("./middlewares/checkForSession");
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const app = express()

let {SERVER_PORT, SESSION_SECRET}=process.env

//MIDDLEWARE
app.use(express.json())
app.use( 
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

//ENDPOINTS FOR AUTH
app.get('/api/user', authController.getUser)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)

//ENDPOINTS FOR CART
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

//ENDPOINTS FOR SWAG
app.get('/api/swag', swagController.read)

//ENDPOINTS FOR SEARCH
app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})