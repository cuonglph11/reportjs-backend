import type { ErrorRequestHandler } from 'express'
import type { IErrorResponse } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandle: ErrorRequestHandler = (error, req, res, next) => {
  const _error = error as IErrorResponse
  const code = _error.code || 500
  const message = _error.message || (error as Error).message
  res.status(code).json({
    message
  })
}

export default errorHandle
