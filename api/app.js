const express = require('express')
const app = express()
const cors = require('cors')
const port = 5500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', require('./AllRoutes/AllRoute'))

app.listen(port, ()=>{
  console.log(`Server running at ${port}`)
})