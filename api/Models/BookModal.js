require('../Helpers/Conn')
const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
  name: String,
  task: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model('book', BookSchema)