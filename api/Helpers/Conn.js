require('mongoose')
// .connect('mongodb://localhost:27017/Task_Management')
.connect('mongodb+srv://mandloiyash04official1:5LjURXuudNb2OFih@cluster0.kk6jt.mongodb.net/')
.then(()=> console.log('MongoDb Connected...'))
.catch(()=> console.log('MongoDb Not Connected...'))

// mandloiyash04official1
// 5LjURXuudNb2OFih