import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import TaskList from '../Pages/TaskList'

const AllRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='tasklist/:bookId' element={<TaskList />} />
    </Routes>
  )
}

export default AllRoute