import React from 'react'

function FormErrorMessage({ error }) {
  if (!error?.message) {
    return null
  }

  return (
    <div className="error-message">
      <p>{error.message}</p>
    </div>
  )
}

export { FormErrorMessage }
