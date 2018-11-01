const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: {type: String},
  photo: {type: String}
})

UserSchema.pre('save', function(next){
  var user = this
  bcrypt.genSalt(10, function(err, salt){
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function(err,hash){
      if(err) next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.verifyPassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) {
      console.log('error: ' + err);
      return callback(err)
    }
    if (!isMatch) {
      console.log('isMatch is false');
    }
    callback(null,isMatch)
  })
}

UserSchema.methods.gravatar = function(size){
  if (!size) size = 200
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro'
  }
  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'

}

const User = mongoose.model('User', UserSchema)

module.exports = User
