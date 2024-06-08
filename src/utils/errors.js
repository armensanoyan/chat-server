export class ApplicationInternalError extends Error {

}

export class ProcessEnvVariableError extends ApplicationInternalError {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
    this.statusCode = 500
    this.errorCode = 'ProcessEnvVariableError'
  }
}

export class InternalError extends ApplicationInternalError {
  constructor () {
    super('The server encountered an internal error. Try again later.')
    this.name = this.constructor.name
    this.statusCode = 500
    this.errorCode = 'InternalError'
  }
}

export class UnauthorizedError extends ApplicationInternalError {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
    this.statusCode = 401
    this.errorCode = 'BrowserUnauthorizedError'
  }
}

export class AuthorizationError extends ApplicationInternalError {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
    this.statusCode = 401
    this.errorCode = 'AuthorizationError'
  }
}

export class ValidationError extends ApplicationInternalError {
  constructor (msg) {
    super(msg)
    this.name = this.constructor.name
    this.statusCode = 400
    this.errorCode = 'InvalidateInputError'
  }
}
