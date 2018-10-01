const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config/keys')

exports.profile = (req, res) => {

  res.json({user: req.user})
}
