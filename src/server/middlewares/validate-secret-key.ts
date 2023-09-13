import type { RequestHandler } from 'express'

import { envs } from '~/configs'
import { ErrorResponse } from '~/utils'

const validateSecretKey: RequestHandler = (req, res, next) => {
  if (req.headers['secret-key'] !== envs.SECRET_KEY) {
    return next(
      new ErrorResponse({
        code: 401,
        message: 'Secret key is missing'
      })
    )
  }
  next()
}

export default validateSecretKey
