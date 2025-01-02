const router = require('express').Router()
const Employee = require('../Models/EmployeeModel')

router.get('/', async(req, res)=>{
  let response = await Employee.find()
  res.send(response)
})

router.get('/:id', async(req, res)=>{
  let response = await Employee.find({ _id: req.params.id })
  res.send(response)
})

router.post('/', async(req, res)=>{
  let response = await Employee.create(req.body)
  res.send(response)
})

router.put('/:id', async(req, res)=>{
  let response = await Employee.updateMany({ _id: req.params.id }, req.body)
  res.send(response)
})

router.delete('/:id', async(req, res)=>{
  let response = await Employee.deleteMany({ _id: req.params.id })
  res.send(response)
})

module.exports = router