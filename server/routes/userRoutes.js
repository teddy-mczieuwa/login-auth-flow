const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
//const requireSignin = passport.authenticate('local', {session: false})

const userRoutes = (User) => {
  const userRouter = express.Router();

  const userController = require('../controllers/userController');

  userRouter.route('/')
  .get(requireAuth, userController.profile);

  return userRouter
};

module.exports = userRoutes;
