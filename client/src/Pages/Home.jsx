import React, { useEffect, useState } from 'react'
import { addBook, getAllBooks, delBook } from '../Redux/BookSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Components/ChildProp/Modal'
import { NavLink } from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch()
  let [selectedBook, setSelectedBook] = useState('')
  let [showAddModal, setShowAddModal] = useState(false)
  let [showDelModal, setShowDelModal] = useState(false)
  let allBooks = useSelector(state => state.BookSlice)
  useEffect(() => {
    dispatch(getAllBooks())
    console.log(allBooks)
  }, [])

  const getBgCol = index => 'bg-b' + ((index % 5) + 2)
  return <>
    {
      showAddModal
      &&
      <Modal
        setShowModal={setShowAddModal}
        action={'addBook'}
        addBook={addBook}
      />
    }
    {
      showDelModal
      &&
      <Modal
        setShowModal={setShowDelModal}
        action={'delBook'}
        cpName={'Book'}
        selectedBook={selectedBook}
        delBook={delBook}
      />
    }


    <div className=' max-w-full min-h-screen p-5 md:p-15 container bg-b1 opacity-100 text-t1 '>
      <div>
        <h1 className='text-4xl md:text-6xl py-10'>Task Books...</h1>
      </div>
      <div className="relative flex flex-wrap">
        {
          allBooks && allBooks.length > 0
            ?
            allBooks.map((book, index) => {
              return (
                <div key={index} className='relative'>
                  <NavLink to={`/tasklist/${book._id}`} className={'hover:scale-105 transition-all'}>
                    <div className={`relative h-48 w-56 m-2 p-3 rounded-lg bg-b3 text-b1 text-3xl font-semibold `}>
                      <div className='w-36'>
                        <h2>{book.name}</h2>
                      </div>
                      <h2 className='text-5xl absolute bottom-0 right-0 m-2 shadow-2xl shadow-white' >{book.task.length}</h2>
                    </div>
                  </NavLink>
                  <button style={{ width: '30px' }}
                    onClick={() => {
                      setShowDelModal(true)
                      setSelectedBook(book)
                    }}
                    className='absolute top-2 right-2 m-2 shadow-2xl shadow-white'
                  >
                    <img src="../../public/cross.svg" alt="Add icon" className='hover:scale-105 transition hover:rotate-90' />
                  </button>
                </div>
              )
            })
            :
            <div className="text-6xl text-center">No books found, create a new by + icon given below.</div>
        }

        <div className='fixed bottom-14 right-10 text-t1'>
          <button
            className='w-16 md:w-auto'
            onClick={() => {
              setShowAddModal(true)
            }}>
            <img src="../../public/add-square-btn.svg" alt="Add icon" className='hover:scale-105 transition hover:rotate-90' />
          </button>

        </div>
      </div>
    </div>
  </>
}

export default Home




