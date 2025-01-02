require('../Helpers/Conn')
const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  task: String,
  status: {
    type: Number,
    default: 0,
  },
  // assigned_by: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'employer',
  // },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
  },
  assigned_at: {
    type: Date,
    default: Date.now,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book',
  },
})

module.exports = mongoose.model('task', TaskSchema)