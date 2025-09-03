const express = require("express")
const app = express()
const cors = require("cors")
const bodyPraser = require('body-parser')
const cookiesP = require('cookie-parser');
const path = require('path')
const { mongodbConnection } = require('./connection/connection')

require('dotenv').config({path:__dirname + "/.env"})
const port = process.env.port || 5000

// connection
mongodbConnection(process.env.mongoUrl || "mongodb://localhost:27017/Attendence")
  .then(() => console.log('mongodb conneted'))
  .catch(err => console.log('kush mongo err'))
//routers 
// body parser
app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(cookiesP())
app.use(cors({
  origin: 'kush add your url', // your frontend URL
  credentials: true
}));
app.use(express.static(path.join(__dirname, './views')))


// set up static files
app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
)