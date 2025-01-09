import * as YUP from 'yup'

const EmployeeValidation = YUP.object({
  name: YUP.string().required('Employee name is required.'),
})

export default EmployeeValidation