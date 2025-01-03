const router = require('express').Router()
const Task = require('../Models/TaskModal')
const Book = require('../Models/BookModal')

router.get('/', async(req, res)=>{
  let response = await Task.find().populate('assigned_to').exec()
  res.send(response)
})

router.get('/getbybookid/:id', async(req, res)=>{
  let response = await Task.find({ book: req.params.id }).populate('assigned_to').exec()
  res.send(response)
})

router.get('/:id', async(req, res)=>{
  let response = await Task.find({ _id: req.params.id }).populate('assigned_to').exec()
  res.send(response)
})

router.post('/', async(req, res)=>{
  let createTask = await Task.create(req.body)
  await Book.updateMany(
    { _id: req.body.book},
    { $push: { task: createTask._id } }
  )
  let response = await Task.findOne({ _id: createTask._id }).populate('assigned_to').exec()
  res.send(response)
})

router.put('/changestatus/:id', async(req, res)=>{
  let newStatus = req.body.status ? 0: 1
  req.body.status = newStatus
  let response = await Task.updateMany({ _id: req.params.id }, req.body)
  res.send(response)
})

router.put('/:id', async(req, res)=>{
  let response = await Task.updateMany({ _id: req.params.id }, req.body)
  res.send(response)
})

router.delete('/:id', async(req, res)=>{
  let response = await Task.deleteMany({ _id: req.params.id })
  res.send(response)
})

module.exports = router