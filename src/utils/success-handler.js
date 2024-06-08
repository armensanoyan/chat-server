/**
   * @param response
   * @param code
   * @param data
   * @description Sends response with given HTTP code constant.
   */
export const _sendResponse = (response, code, data) => {
  if (code.STATUS === 204) { return response.status(code.STATUS).json() }

  const result = {
    status: code.STATUS,
    message: code.MESSAGE,
    data
  }

  response.status(result.status).json(result)
}

export const HTTP_CODE_CONSTANTS = {
  SUCCESS_200: { STATUS: 200, MESSAGE: 'OK' },
  SUCCESS_201: { STATUS: 201, MESSAGE: 'Created' },
  SUCCESS_204: { STATUS: 204 }
}

/**
   * @param response
   * @param result
   * @description Handle `get` method list requests.
   */
export const handleList = (response, result) => {
  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, result || [])
}

/**
   * @param response
   * @param result
   * @description Handle 'get' method requests.
   */
export const handleGet = (response, result) => {
  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, result || null)
}

/**
   * @param response
   * @param result
   * @description Handle 'add' method requests.
   */
export const handleAdd = (response, result) => {
  if (!result) { return _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_204) }

  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_201, result)
}

/**
   * @param response
   * @param result
   * @description Handle `put, patch` method requests.
   */
export const handleUpdate = (response, result) => {
  if (!result) { return _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_204) }

  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, result)
}

/**
   * @param response
   * @param result
   * @description Handle soft `delete` method requests.
   */
export const handleDelete = (response, result) => {
  if (!result) { return _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_204) }

  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, { affectedRows: 1 })
}

/**
   * @param response
   * @param result
   * @description Handle soft bulk `delete` method requests.
   */
export const handleSoftBulkDeleteWithResponse = (response, result) => {
  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, result)
}
