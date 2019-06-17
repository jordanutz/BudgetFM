const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const app = express()

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is kickin')
})

// Controllers 

PORT = 6800;

app.listen(PORT, ()=> {
  console.log(`Blasting off on Port ${PORT} 🚀 `)
})

