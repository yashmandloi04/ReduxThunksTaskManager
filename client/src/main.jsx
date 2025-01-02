import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import BookSlice from './Redux/BookSlice.jsx'
import TaskSlice from './Redux/TaskSlice.jsx'
import EmployeeSlice from './Redux/EmployeeSlice.jsx'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({ BookSlice, TaskSlice, EmployeeSlice })
const store = configureStore({ reducer: rootReducer })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
