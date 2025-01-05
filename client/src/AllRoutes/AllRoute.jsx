import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import TaskList from '../Pages/TaskList'
import NoPageFound from '../Pages/NoPageFound'

const AllRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='tasklist/:bookId' element={<TaskList />} />
      <Route path='*' element={<NoPageFound />} />
    </Routes>
  )
}

export default AllRoute