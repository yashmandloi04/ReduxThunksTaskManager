import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../Helpers/Path'

const addBook = createAsyncThunk('addBook', async (frmObj)=>{
  // console.log('thunk '+ frmObj)
  let response = await axios.post(`${API_URL}/book`, frmObj)
  // console.log('response.data '+ response.data)
  return response.data
})

const delBook = createAsyncThunk('delBook', async (bookObj)=>{
  let response = await axios.delete(`${API_URL}/book/${bookObj._id}`)
  if(response.request.status == 200)
    return bookObj
})

const getAllBooks = createAsyncThunk('getAllBooks', async ()=>{
  let response = await axios.get(`${API_URL}/book`)
  return response.data
})
const BookSlice = createSlice({
  name: 'BookSlice',
  initialState: [],
  extraReducers: (builder)=>{
    builder.addCase(addBook.fulfilled, (curState, action)=>{
      curState.push(action.payload)
    })
    builder.addCase(getAllBooks.fulfilled, (curState, action)=>{
      return action.payload
    })
    builder.addCase(delBook.fulfilled, (curState, action)=>{
      return curState.filter(book => book._id != action.payload._id)
    })
  }
})

export { addBook, getAllBooks, delBook }
export default BookSlice.reducer