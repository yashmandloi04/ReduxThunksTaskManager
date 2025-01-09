import * as YUP from 'yup'

const TaskValidation = YUP.object({
  task: YUP.string().required('Task is required.'),
  assigned_to: YUP.string().required('Employee name is required.'),
  // book: YUP.string().required('Book is required.'),
})

export default TaskValidation