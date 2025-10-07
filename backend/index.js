require('dotenv').config({path:__dirname + "/.env"})
const express = require("express")
const app = express()
const cors = require("cors")
const bodyPraser = require('body-parser')
const cookiesP = require('cookie-parser');
const path = require('path')
const { mongodbConnection } = require('./connection/connection')
const postRouter = require('./routes/postroutes')
app.use('/api', postRouter)
const port = process.env.port || 5000

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
// connection
mongodbConnection(process.env.mongoUrl || "mongodb://localhost:27017/Attendence")
  .then(() => console.log('mongodb conneted'))
  .catch(err => console.log('kush mongo err'))
//routers 
// body parser
app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(cookiesP())
app.use(express.static(path.join(__dirname, './views')))
 
app.use('/', postRouter)

// set up static files
app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
)