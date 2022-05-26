const mongoose  = require('mongoose')

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  todoList: {type: []}
})

module.exports = mongoose.model('Users', userSchema)