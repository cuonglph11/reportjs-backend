import type { RequestHandler } from 'express'
import { ErrorResponse } from '~/utils'

const parseBodyStringToJson: RequestHandler = (req, res, next) => {
  console.log(req.body)
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body)
    } catch (error) {
      return next(
        new ErrorResponse({
          code: 400,
          message: "Can't parse json data from req.body"
        })
      )
    }
  }

  next()
}

export default parseBodyStringToJson
