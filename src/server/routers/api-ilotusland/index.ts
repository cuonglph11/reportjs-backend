import express from 'express'
import { fs, rabbitmq } from '~/services'
import { formater } from '~/utils'
import validateBody from './validate-body.middleware'

const router = express.Router()

router.put('/', validateBody, (req, res) => {
  const data = formater.JsonFormat(req.body)
  for (const value of data) {
    fs.createTXTFileToOrgFolder({
      orgKey: value.organizationId,
      stationKey: value.stationId,
      receivedAt: value.receivedAt,
      measures: value.measures
    })
    rabbitmq.sendToRawExchange(value)
  }
  return res.send({ success: true })
})

export default router
