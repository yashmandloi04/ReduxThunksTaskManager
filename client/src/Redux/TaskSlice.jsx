import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../Helpers/Path'

const addTask = createAsyncThunk('addTask', async (taskFrm) => {
  let response = await axios.post(`${API_URL}/task`, taskFrm)
  console.log(response.data)
  return response.data
})
const delTask = createAsyncThunk('delTask', async (taskObj) => {
  let response = await axios.delete(`${API_URL}/task/${taskObj._id}`)
  if (response.request.status == 200)
    return taskObj
})
const updateTask = createAsyncThunk('updateTask', async (taskObj) => {
  let response = await axios.update(`${API_URL}/task/${taskObj._id}`)
  if (response.request.status == 200)
    return taskObj
})
const getAllTask = createAsyncThunk('getAllTask', async (bookId) => {
  let response = await axios.get(`${API_URL}/task/getbybookid/${bookId}`)
  return response.data
})
const changeStatus = createAsyncThunk('changeStatus', async (taskObj) => {
  let response = await axios.put(`${API_URL}/task/changestatus/${taskObj._id}`, taskObj)
  if (response.request.status == 200)
    return taskObj
})
const TaskSlice = createSlice({
  name: 'TaskSlice',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (curState, action) => {
      curState.push(action.payload)
    })
    builder.addCase(delTask.fulfilled, (curState, action) => {
      return curState.filter(task => task._id != action.payload._id)
    })
    builder.addCase(updateTask.fulfilled, (curState, action) => {
      return curState.map(task => {
        if (task._id == action.taskObj._id)
          return { ...taskObj }
        else
          return task
      })
    })
    builder.addCase(getAllTask.fulfilled, (curState, action) => {
      return action.payload
    })
    builder.addCase(changeStatus.fulfilled, (curState, action) => {
      return curState.map(task => {
        if (task._id == action.payload._id) {
          return { ...task, status: task.status ? 0 : 1 }
        } else {
          return task
        }
      })
    })
  }
})

export { addTask, delTask, updateTask, getAllTask, changeStatus }
export default TaskSlice.reducer