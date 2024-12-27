const router = require('express').Router()

router.get('/api/task', require('../Controllers/TaskController'))

module.exports = router