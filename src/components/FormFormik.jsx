import { useFormik } from 'formik'

import * as Yup from 'yup'
import styled from 'styled-components'

const Span = styled.span`
  color: red;
`

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
})
const FormFormik = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values)

      resetForm()
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto d-flex flex-column gap-10 "
      style={{ maxWidth: '400px' }}
    >
      <div className="mb-2">
        <label htmlFor="username" className="form-label text-capitalize">
          username
        </label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
        />
        {formik.errors.username && formik.touched.username && (
          <Span>{formik.errors.username}</Span>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="form-label text-capitalize">
          email
        </label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
        />
        {formik.errors.email && formik.touched.email && (
          <Span>{formik.errors.email}</Span>
        )}
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="form-label text-capitalize">
          password
        </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
        />
        {formik.errors.password && formik.touched.password && (
          <Span>{formik.errors.password}</Span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
export default FormFormik
