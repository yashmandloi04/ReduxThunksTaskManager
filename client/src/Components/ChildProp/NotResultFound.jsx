import React from 'react'

const NotResultFound = () => {
  return (
    <div className=' max-w-full min-h-screen p-5 md:p-15 container bg-b1 opacity-100 text-t1 '>
      <div className="flex flex-col items-center space-y-12">
        <div>
        <img src="sad-dog-2.jpg" style={{width: '300px'}} />
        </div>
        <div>
        <h3 className='text-3xl italic font-bold'>No Book Found</h3>
        </div>
      </div>
    </div>
  )
}

export default NotResultFound