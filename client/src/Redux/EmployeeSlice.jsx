import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../Helpers/Path";

const addEmp = createAsyncThunk('addEmp', async (empFrm)=>{
  let response = await axios.post(`${API_URL}/employee`, empFrm)
  return response.data
})

const getAllEmp = createAsyncThunk('getAllEmp', async ()=>{
  let response = await axios.get(`${API_URL}/employee`)
  return response.data
})

const EmployeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(addEmp.fulfilled, (curState, action)=>{
      curState.push(action.payload)
    })
    builder.addCase(getAllEmp.fulfilled, (curState, action)=>{
      return action.payload
    })
  }
})

export default EmployeeSlice.reducer
export { addEmp, getAllEmp }