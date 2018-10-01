const express = require('express')
const passport = require('passport');
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user');
const config = require('./config/keys')

const authRouter = require('./routes/authRoutes')(User)
const userRouter = require('./routes/userRoutes')(User)
mongoose.connect(config.mongoURI, function(err){
  if (err) {
    console.log('Error connecting to the database')
  } else {
    console.log('Connected to the database')
  }
})

const app = express()

//app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {console.log('App is listening on port ' + PORT)})
