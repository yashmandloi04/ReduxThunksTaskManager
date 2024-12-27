const router = require('express').Router()
const Task = require('../Models/TaskModal')

router.get('/', async(req, res)=>{
  let response = await Task.find()
  res.send(response)
})

router.get('/:id', async(req, res)=>{
  let response = await Task.find({ _id: req.params.id })
  res.send(response)
})

router.post('/', async(req, res)=>{
  let response = await Task.create(req.body)
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