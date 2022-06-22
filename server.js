const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.MONGO_URI
const mongoUser = process.env.MONGO_USN
const mongoPassword = process.env.MONGO_PWD
console.log(uri)
mongoose.connect(uri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // user: mongoUser,
  // pass: mongoPassword
 })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const workoutRouter = require('./routes/workouts')
const userRouter = require('./routes/users')

app.use('/workouts', workoutRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server runningn on port ${port}`)
})