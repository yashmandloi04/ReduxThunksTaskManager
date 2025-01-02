const router = require('express').Router()

router.use('/api/book', require('../Controllers/BookController'))
router.use('/api/task', require('../Controllers/TaskController'))
router.use('/api/employee', require('../Controllers/EmployeeController'))

module.exports = router