import { useState } from 'react'
import FormInput from './components/FormInput'

const TestForm = () => {
  console.log('re-rendered')

  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(Object.fromEntries(data))
  }

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'text',
      placeholder: 'enter your email',
      label: 'email',
    },
    {
      id: 2,
      name: 'username',
      type: 'text',
      placeholder: 'enter your username',
      label: 'username',
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'enter your password',
      label: 'password',
    },
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  console.log(values)
  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <h1>Form</h1>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                values={values[input.name]}
                onChange={onChange}
              />
            )
          })}
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
export default TestForm
