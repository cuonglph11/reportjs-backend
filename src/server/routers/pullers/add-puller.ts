import { RequestHandler } from 'express'
import { puller } from '~/services'
import { ATDriverPuller, IlotuslandShareAPIPuller } from '~/services/puller'
import { PullerConfig } from '~/services/puller/types'
import ErrorResponse from '~/utils/response'

const addPuller: RequestHandler = (req, res, next) => {
  /* TODO: validate configs body with ajv */
  const pullerConfig = req.body as PullerConfig
  const pullerController = puller.Controller

  switch (pullerConfig.source) {
    case 'IlotuslandShareAPI': {
      const target = _createIlotuslandShareAPIPuller(pullerConfig)
      pullerController.addPuller(target)
      break
    }
    case 'ATDriver': {
      const target = _createATDriverPuller(pullerConfig)
      pullerController.addPuller(target)
      break
    }
    default:
      return next(
        new ErrorResponse({
          code: 401,
          message: 'Puller source is not correctly'
        })
      )
  }

  res.send({ message: true })
}

function _createIlotuslandShareAPIPuller(
  pullerConfig: PullerConfig
): IlotuslandShareAPIPuller {
  const shareURL = pullerConfig.requestConfig.url
  if (!shareURL) {
    throw new ErrorResponse({
      code: 401,
      message: 'Request URL not found'
    })
  }

  const id = new URL(shareURL).searchParams.get('id')
  if (!id) {
    throw new ErrorResponse({
      code: 401,
      message: 'id not found in query'
    })
  }

  const pullerKey = `${pullerConfig.orgKey}_${id}`
  return new puller.IlotuslandShareAPIPuller(pullerKey, pullerConfig)
}

function _createATDriverPuller(pullerConfig: PullerConfig): ATDriverPuller {
  return new puller.ATDriverPuller(pullerConfig.orgKey, pullerConfig)
}

export default addPuller
