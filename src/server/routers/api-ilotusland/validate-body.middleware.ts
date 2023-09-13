import type { RequestHandler } from 'express'
import { ErrorResponse } from '~/utils'

const validateBody: RequestHandler = (req, res, next) => {
  /* TODO: validate rawJson with joi */
  if (!Array.isArray(req.body)) {
    return next(
      new ErrorResponse({
        code: 400,
        message: 'Request body format: [{...}, {...}]'
      })
    )
  }

  if (req.body.length === 0) {
    return next(
      new ErrorResponse({
        code: 400,
        message: "Request body can't empty"
      })
    )
  }

  next()
}

export default validateBody
