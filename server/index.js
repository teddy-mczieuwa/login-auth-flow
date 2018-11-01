const express = require('express')
const passport = require('passport');
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user');
const config = require('./config/keys');
const path = require('path');

const authRouter = require('./routes/authRoutes')(User)
const userRouter = require('./routes/userRoutes')(User)
mongoose.connect(config.mongoURI, {
    "useNewUrlParser": true
}, function(err){
  if (err) {
    console.log('Error connecting to the database')
  } else {
    console.log('Connected to the database')
  }
});
mongoose.Promise = global.Promise;

const app = express();

//app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(express.static('../client/public'));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'))
});


const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {console.log('App is listening on port yes ' + PORT)})
