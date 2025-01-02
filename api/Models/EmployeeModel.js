require('../Helpers/Conn')
const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
  name: String,
})

module.exports = mongoose.model('employee', EmployeeSchema)