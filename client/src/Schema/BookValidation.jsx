import * as YUP from 'yup'

const BookValidation = YUP.object({
  name: YUP.string().required('Book name is required.'),
})

export default BookValidation