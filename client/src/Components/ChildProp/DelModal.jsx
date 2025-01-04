import React from 'react'
import { useDispatch } from 'react-redux'

const DelModal = ({ cpName,setShowModal ,selectedElement, dispatchHandler, delHandler }) => {
  const dispatch = useDispatch()
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


        <div className="p-4 md:p-5 text-center">

          <h3 className="mb-5 text-lg font-normal text-white dark:text-white">
            Sure want to delete <span className='font-bold'>{selectedElement && selectedElement.name}</span> {cpName}
          </h3>
          <button
            type="submit"
            onClick={() =>{ 
              setShowModal(false)
              dispatchHandler(delHandler, selectedElement)
            }}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
           Yes, delete
          </button>

          <button
            type='button'
            onClick={() => setShowModal(false)}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
    </div>
  </div>
  )
}

export default DelModal