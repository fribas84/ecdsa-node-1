import React from 'react'

const ErrorHandler = ({errorText}) => {
  return (
    <div className='errorHandler'><div>{errorText}</div></div>
  )
}

export default ErrorHandler