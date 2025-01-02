import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, changeStatus, getAllTask } from '../Redux/TaskSlice'
import { addEmp, getAllEmp } from '../Redux/EmployeeSlice'
import { getBookDetails } from '../Services/BookServices'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import Modal from '../Components/ChildProp/Modal'
const TaskList = () => {
  const dispatch = useDispatch()
  const params = useParams()
  let [book, setBook] = useState({})
  let [empList, setEmpList] = useState([])
  let [showAddEmpMd, setShowAddEmpMd] = useState(false)
  const allTask = useSelector(state => state.TaskSlice)
  const allEmp = useSelector(state => state.EmployeeSlice)
  useEffect(() => {
    getBook()
    dispatch(getAllTask())
    dispatch(getAllEmp())
  }, [])

  const getBook = async () => {
    let bookName = await getBookDetails(params.bookId)
    setBook(bookName)
  }
  const addTaskFrm = useFormik({
    initialValues: {
      task: '',
      assigned_to: '',
      book: '',
    },
    onSubmit: (addTaskFrm) => {
      addTaskFrm.book = params.bookId
      dispatch(addTask(addTaskFrm))
    }
  })
  const statusChangeHandler = async (task)=>{
    await dispatch(changeStatus(task))
  }
  return <>
    {
      showAddEmpMd
      &&
      <Modal
        action={'addEmp'}
        addEmp={addEmp}
        setShowModal={setShowAddEmpMd}
      />
    }
    <div className="max-w-full min-h-screen container p-10 bg-b1 opacity-100 text-t1">
      <div className="flex flex-col space-y-5">
        <h1 className='text-5xl'>{book.name} Tasks...</h1>

        <form onSubmit={addTaskFrm.handleSubmit}>
          <input type="hidden" name='book' />
          <div className="block py-5 md:py-10 md:flex w-full space-y-5 md:space-y-0 md:space-x-5 m-auto">
            {/* Task Input */}
            <input
              type="text"
              name="task"
              onChange={addTaskFrm.handleChange}
              className="w-full md:w-1/3 p-3 rounded-lg bg-white text-black placeholder-black opacity-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter task here..."
            />

            {/* Employee Select */}
            <div className="w-full md:w-1/3 flex">
              <select className="w-full p-3 rounded-s-lg bg-white placeholder-black text-black opacity-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                onChange={addTaskFrm.handleChange}
                name='assigned_to'
              >
                <option value="null">- Select employee -</option>
                {
                  allEmp &&
                  allEmp.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)
                }
              </select>
              <button className="w-14 md:w-24 rounded-e-lg bg-white placeholder-black text-black opacity-50 border border-gray-300 border-l-gray-500 hover:opacity-40 focus:ring-2 focus:ring-black focus:outline-none" type="button"
                onClick={() => {
                  setShowAddEmpMd(true)
                }}
              >
                +
              </button>
            </div>
            {/* Submit Button */}
            <button type="submit"
              className='py-2 px-8 rounded-lg bg-white opacity-50 text-black hover:opacity-40'
            >Assign</button>
          </div>
        </form>
        <div className='md:flex justify-between'>
          <div>
            <h2 className='py-3 text-3xl'>Task not done yet...</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg capitalize bg-[#8685ef] text-black border-b-2 border-b-[#b1b0e8]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allTask.map(task => {
                      if(task.status == 0){
                        return <tr key={task._id} className="text-md font-semibold text-[#000000] bg-[#8685ef] border-b-2 border-b-[#b6b5e9]">
                        <td className="px-6 py-4">
                          {task.task}
                        </td>
                        <td className="px-6 py-4">
                          {task.assigned_to && task.assigned_to.name}
                        </td>
                        <td>
                          <button
                          onClick={()=>statusChangeHandler(task)}
                          className="px-6 py-3 rounded-lg bg-[#4441e5] hover:bg-[#5856e5]">
                            Done
                          </button>
                        </td>
                      </tr>
                      }
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
          <div>
            <h2 className='py-3 text-3xl'>Task not done yet...</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg capitalize bg-[#8685ef] text-black border-b-2 border-b-[#b1b0e8]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allTask.map(task => {
                      if(task.status == 1){
                        return <tr key={task._id} className="text-md font-semibold text-[#000000] bg-[#8685ef] border-b-2 border-b-[#b6b5e9]">
                        <td className="px-6 py-4">
                          {task.task}
                        </td>
                        <td className="px-6 py-4">
                          {task.assigned_to && task.assigned_to.name}
                        </td>
                        <td>
                          <button
                          onClick={()=>dispatch(changeStatus(task))}
                          className="px-6 py-3 rounded-lg bg-[#4441e5] hover:bg-[#5856e5]">
                            Un Done
                          </button>
                        </td>
                      </tr>
                      }
                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
}

export default TaskList