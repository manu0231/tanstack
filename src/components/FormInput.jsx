import React from 'react'

const FormInput = (props) => {
  const { label, onChange, name, id, ...otherProps } = props
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label text-capitalize">
        {label}
      </label>
      <input
        className="form-control"
        name={name}
        {...otherProps}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
