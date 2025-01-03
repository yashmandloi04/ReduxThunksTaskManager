const router = require('express').Router()
const Book = require('../Models/BookModal')

router.get('/', async(req, res)=>{
  console.log('213213132')
  let response = await Book.find()
  res.send(response)
})

router.get('/:id', async(req, res)=>{
  let response = await Book.find({ _id: req.params.id })
  res.send(response)
})

router.post('/', async(req, res)=>{
  let response = await Book.create(req.body)
  res.send(response)
})

router.put('/:id', async(req, res)=>{
  let response = await Book.updateMany({ _id: req.params.id }, req.body)
  res.send(response)
})

router.delete('/:id', async(req, res)=>{
  let response = await Book.deleteMany({ _id: req.params.id })
  res.send(response)
})

module.exports = router