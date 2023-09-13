// import URL from 'url'
import express from 'express'
import getPuller from './get-puller'
import addPuller from './add-puller'

const router = express.Router()

router.get('/', getPuller)

/* 
  Add new puller config to puller controller
*/
router.post('/', addPuller)

export default router
