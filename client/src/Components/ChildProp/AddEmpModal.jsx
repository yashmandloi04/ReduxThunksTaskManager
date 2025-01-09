import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addEmp } from '../../Redux/EmployeeSlice'
import TaskValidation from '../../Schema/TaskValidation'
import EmployeeValidation from '../../Schema/EmployeeValidation'

const AddEmpModal = ({ setShowModal, addEmp }) => {
  const dispatch = useDispatch()
  const nameField = useRef('')
  const EmpFrm = useFormik({
    validationSchema: EmployeeValidation,
    initialValues: {
      name: '',
    },
    onSubmit: (empFrm) => {
      dispatch(addEmp(empFrm))
      nameField.current.value = ''
    }
  })
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full bg-b1 opacity-95 rounded-lg shadow ">
        {/* Modal Header */}
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowModal(false)}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        {/* Modal Body */}
        <div className="p-4 md:p-5 text-center">
          <form onSubmit={EmpFrm.handleSubmit}>

            <h3 className="mb-5 text-lg font-normal text-white dark:text-white">
              Add new employee
            </h3>

            <input type="text" ref={nameField} name="name" onChange={EmpFrm.handleChange}
              className={`block w-full m-auto my-4 p-2 rounded-lg bg-white placeholder-black opacity-50 ${EmpFrm.errors.name
                && EmpFrm.touched.name
                && 'border-red-500'}`}

              placeholder='Enter employee name here...' />
            <div className='mb-2'>
              {EmpFrm.errors.name
                && EmpFrm.touched.name
                && <small className='text-red-500'>{EmpFrm.errors.name}</small>}
            </div>


            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Add Employee
            </button>

            <button
              type='button'
              onClick={() => setShowModal(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddEmpModal