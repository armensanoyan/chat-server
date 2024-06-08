import { ApplicationInternalError, InternalError } from '../utils/errors.js'

/**
 * Error handler middleware function.
 */
export const ErrorHandler = (err, request, response, next) => {
  console.log({ err })
  const error = (err instanceof ApplicationInternalError) ? err : new InternalError()
  const errorResponse = {
    status: error.statusCode,
    code: error.errorCode,
    message: error.errorMessage || error?.errors?.[0]?.message || error.message
  }

  errorResponse.status === 500 && console.log('Error: ', error)

  if (errorResponse.status === 503) {
    response.setHeader('Retry-After', 2 * 60 * 60)
  }

  response.status(errorResponse.status).json(errorResponse)
}
