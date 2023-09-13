import fs from 'fs'
import { expect } from 'chai'
import { app } from '~/server'
import { envs } from '~/configs'
import { time } from '~/utils'
import supertest from 'supertest'

const req = supertest(app)
const requestPath = '/api/ilotusland'

describe(`PUT ${requestPath}`, () => {
  describe('main controller', () => {
    afterEach(() => {
      _rmfolder(envs.TXT_DUM_FOLDER)
    })

    it('Should return 401 and error message if not secret key in header', async () => {
      const res = await req.put(requestPath)
      expect(res.statusCode).to.equal(401)
      expect(res.body).to.have.any.keys('message')
      expect(res.body.message).to.equal('Secret key is missing')
    })

    it('Should create file with correct json body', async () => {
      const headers = { 'secret-key': envs.SECRET_KEY }

      const fakeBody = [
        {
          organizationId: 'org',
          stationId: 'station1',
          parameter: 'pH',
          value: 6,
          unit: 'mg/L',
          status: 'GOOD',
          timeStamp: '2022-04-19T11:06:00+07:00'
        },
        {
          organizationId: 'org',
          stationId: 'station2',
          parameter: 'pH',
          value: 6,
          unit: 'mg/L',
          status: 'GOOD',
          timeStamp: '2022-04-19T11:06:00+07:00'
        }
      ]

      const res = await req.put(requestPath).set(headers).send(fakeBody)

      expect(res.statusCode).to.equal(200)
      expect(res.body).to.eqls({ success: true })

      for (const data of fakeBody) {
        const filename = `${data.stationId}_${time.formatPayloadTime(
          data.timeStamp
        )}.txt`

        const pathToFile = `${
          envs.TXT_DUM_FOLDER
        }/${data.organizationId.toUpperCase()}/${
          data.stationId
        }/${time.formatDateFolder()}/${filename}`

        expect(fs.existsSync(pathToFile)).true
      }
    })
  })
})

function _rmfolder(folderPath: string) {
  fs.rmSync(folderPath, { recursive: true, force: true })
}
