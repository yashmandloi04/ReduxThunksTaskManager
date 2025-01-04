import React from 'react'
import { useSelector } from 'react-redux'

const AddEmpFrm = () => {
    const allEmp = useSelector(state => state.EmployeeSlice)
  return (
    allEmp &&
    allEmp.map(emp => {
      return <>
        <option key={emp._id} value={emp._id}>
          {emp.name}
          <button>X</button>
        </option>
      </>
    })

  )
}

export default AddEmpFrm