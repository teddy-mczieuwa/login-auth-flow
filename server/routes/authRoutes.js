const express = require('express')
const passport = require('passport')
const passportService = require('../services/passport')
const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

const authRoutes = (User) => {
  const authRouter = express.Router()

  const authController = require('../controllers/authController')

  authRouter.route('/signup')
  .post(authController.signup)

  authRouter.route('/signin')
  .post(requireSignin, authController.signin);

  authRouter.route('/logout')
  .get(authController.logout)

  authRouter.route('/')
  .get(requireAuth, (req, res) => {
    res.send({msg: 'hi there'})
  })

  return authRouter
}

module.exports = authRoutes
