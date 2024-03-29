export const ErrorHandler = (err) => {
  const errors = []
  console.log(err.response.data.error)
  if (err && err.response && err.response.data) {
    if (err.response.data.hasError) {
      const { fieldValidationErrors, processErrors } = err.response.data
      if (fieldValidationErrors) {
        err.response.data.fieldValidationErrors.forEach((e) => {
          errors.push(e.message)
        })
      } else if (processErrors) {
        err.response.data.processErrors.forEach((e) => {
          errors.push(e.errorMessage)
        })
      } else if (err.response.data.response) {
        errors.push(err.response.data.response)
      } else {
        errors.push(err.response.data.errorMessage)
      }
    } else if (err.response.data.errorMessage) {
      errors.push(err.response.data.response)
    } else if (err.response.data.error) {
      errors.push(err.response.data.error)
    } else if (err.response.data.message) {
      if (typeof err.response.data.message === 'object') {
        const obj = err.response.data.message
        for (const property in obj) {
          errors.push(obj[property])
        }
      } else if (typeof err.response.data.message === 'string') {
        errors.push(err.response.data.message)
        if (
          err.response.data.message === 'Unauthenticated.' ||
          err.response.data.message ===
            'Call to a member function token() on null'
        ) {
          console.log('Unauthenticated.')
          window.location.href = '/'
          localStorage.clear()
        }
      }
    } else if (
      err.response.data.error_description &&
      err.response.data.error_description.includes('token expired')
    ) {
      errors.push('Session expired!!!')
      console.log('this is where it got to8')
    }
  } else if (err && err.message) {
    errors.push(err.message)
  } else if (err && err.error) {
    errors.push(err.error)
  }
  return errors
}
export default ErrorHandler
