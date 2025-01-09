import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, changeStatus, getAllTask, delTask } from '../Redux/TaskSlice'
import { addEmp, getAllEmp } from '../Redux/EmployeeSlice'
import { getBookDetails } from '../Services/BookServices'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import Modal from '../Components/ChildProp/Modal'
import { FiUserPlus } from "react-icons/fi";
import AddEmpFrm from '../Components/ChildProp/AddEmpModal'
import DelModal from '../Components/ChildProp/DelModal'
import TaskValidation from '../Schema/TaskValidation'
import AddEmpModal from '../Components/ChildProp/AddEmpModal'

const TaskList = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const allEmp = useSelector(state => state.EmployeeSlice)
  let [book, setBook] = useState({})
  let [empList, setEmpList] = useState([])
  let [showAddEmpMd, setShowAddEmpMd] = useState(false)
  let [showDelModal, setShowDelModal] = useState(false)
  let [selectedTask, setSelectedTask] = useState({})
  const taskField = useRef('')
  const assignedField = useRef('')
  const allTask = useSelector(state => state.TaskSlice)

  useEffect(() => {
    getBook()
    dispatch(getAllTask((params.bookId)))
    dispatch(getAllEmp())
  }, [])
  const dispatchHandler = (handler, params) => {
    dispatch(handler(params))
  }
  const getBook = async () => {
    let bookName = await getBookDetails(params.bookId)
    setBook(bookName)
  }
  const addTaskFrm = useFormik({
    validationSchema: TaskValidation,
    initialValues: {
      task: '',
      assigned_to: '',
      book: '',
    },
    onSubmit: (addTaskFrm) => {
      addTaskFrm.book = params.bookId
      dispatch(addTask(addTaskFrm))
      taskField.current.value = ''
      assignedField.current.value = ''
    }
  })
  const statusChangeHandler = async (task)=> {
    dispatch(changeStatus(task))
  }
  return <>
    {
      showAddEmpMd
      &&
      <AddEmpModal
        addEmp={addEmp}
        setShowModal={setShowAddEmpMd}
      />
    }
    {
      showDelModal
      &&
      <DelModal
        setShowModal={setShowDelModal}
        cpName={'Task'}
        selectedElement={selectedTask}
        dispatchHandler={dispatchHandler}
        delHandler={delTask}
      />
    }
    <div className="max-w-full min-h-screen container p-10 bg-b1 opacity-100 text-t1">
      <div className="flex flex-col space-y-5">
        <h1 className='text-5xl'>{book.name} Tasks...</h1>

        <form onSubmit={addTaskFrm.handleSubmit}>
          <input type="hidden" name="book" />
          <div className="block py-5 md:py-10 md:flex w-full space-y-5 md:space-y-0 md:space-x-5 m-auto">
            {/* Task Input */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                ref={taskField}
                name="task"
                onChange={addTaskFrm.handleChange}
                className="w-full p-3 rounded-lg bg-white text-black placeholder-black opacity-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter task here..."
              />
              {addTaskFrm.errors.task && addTaskFrm.touched.task && (
                <small className="text-red-500">{addTaskFrm.errors.task}</small>
              )}
            </div>

            {/* Employee Select */}
            <div className="w-full md:w-1/3">
              <div className="flex">
                <select
                ref={assignedField}
                  className="w-full p-3 rounded-s-lg bg-white text-black placeholder-black opacity-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                  onChange={addTaskFrm.handleChange}
                  name="assigned_to"
                >
                  <option defa value="null" selected>- Select employee -</option>
                  {allEmp &&
                    allEmp.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                </select>
                <button
                  className="w-14 md:w-24 rounded-e-lg bg-white text-black opacity-50 border border-gray-300 border-l-gray-500 hover:opacity-40 focus:ring-2 focus:ring-black focus:outline-none"
                  type="button"
                  onClick={() => setShowAddEmpMd(true)}
                >
                  <div className="px-4 md:px-8">
                    <FiUserPlus size={20} />
                  </div>
                </button>
              </div>
              {addTaskFrm.errors.assigned_to && addTaskFrm.touched.assigned_to && (
                <small className="text-red-500">{addTaskFrm.errors.assigned_to}</small>
              )}
            </div>
            <button type="submit"
              className='h-12 py-2 px-8 rounded-lg bg-white opacity-50 text-black hover:opacity-40'
            >Assign</button>
            {/* Submit Button */}
            {/* <button
              type="submit"
              className="py-2 px-8 rounded-lg bg-white opacity-50 text-black hover:opacity-40"
            >
              Assign
            </button> */}
          </div>
        </form>

        <div className='md:flex md:justify-between'>
          <div className='md:w-1/2 md:me-2'>
            <h2 className='py-3 text-3xl capitalize'>Task not done yet...</h2>
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg capitalize bg-[#E76D83] text-black border-b-2 border-b-[#7c3c4a]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allTask.map(task => {
                      if (task.status == 0) {
                        return <tr key={task._id} className="text-md font-semibold text-[#000000] bg-[#E76D83] border-b-2 border-b-[#7c3c4a]">
                          <td className="px-6 py-4">
                            {task.task}
                          </td>
                          <td className="px-6 py-4">
                            {task.assigned_to && task.assigned_to.name}
                          </td>
                          <td>
                            <button
                              onClick={() => statusChangeHandler(task)}
                              className="px-6 py-3 rounded-lg bg-[#7c3c4a] hover:bg-[#B25567]">
                              Done
                            </button>
                          </td>
                          <td>
                            <button style={{ width: '30px' }}
                              onClick={() => {
                                setShowDelModal(true)
                                setSelectedTask(task)
                              }}
                              className='mx-2 shadow-2xl shadow-white'
                            >
                              <img src="../../public/cross.svg" alt="Add icon" className='hover:scale-105 transition hover:rotate-90' />
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

          <div className='md:w-1/2 md:ms-2'>
            <h2 className='py-3 text-3xl capitalize'>Task completed...</h2>
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg capitalize bg-[#E76D83] text-black border-b-2 border-b-[#7c3c4a]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allTask.map(task => {
                      if (task.status == 1) {
                        return <tr key={task._id} className="text-md font-semibold text-[#000000] bg-[#E76D83] border-b-2 border-b-[#7c3c4a]">
                          <td className="px-6 py-4">
                            {task.task}
                          </td>
                          <td className="px-6 py-4">
                            {task.assigned_to && task.assigned_to.name}
                          </td>
                          <td>
                            <button
                              onClick={() => statusChangeHandler(task)}
                              className="px-6 py-3 rounded-lg bg-[#7c3c4a] hover:bg-[#B25567]">
                              Undo
                            </button>
                          </td>
                          <td>
                            <button style={{ width: '30px' }}
                              onClick={() => {
                                setShowDelModal(true)
                                setSelectedTask(task)
                              }}
                              className='mx-2 shadow-2xl shadow-white'
                            >
                              <img src="../../public/cross.svg" alt="Add icon" className='hover:scale-105 transition hover:rotate-90' />
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