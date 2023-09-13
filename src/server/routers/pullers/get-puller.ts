import { RequestHandler } from 'express'
import { puller } from '~/services'

const getPuller: RequestHandler = (req, res) => {
  const configs = puller.Controller.getPullers()
  res.send(configs)
}

export default getPuller
