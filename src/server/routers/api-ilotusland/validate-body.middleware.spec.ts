import { expect } from 'chai'
import { app } from '~/server'
import { envs } from '~/configs'
import supertest from 'supertest'

const req = supertest(app)
const requestPath = '/api/ilotusland'

describe('validateBody middleware', () => {
  it('Should repost with code 400, error message', async () => {
    const headers = {
      'secret-key': envs.SECRET_KEY
    }
    const res = await req.put(requestPath).set(headers).send({})
    expect(res.statusCode).to.equal(400)
    expect(res.body).to.have.any.keys('message')
    expect(res.body.message).to.equal('Request body format: [{...}, {...}]')
  })

  it('Should reponse with code 400 and error message when body is empty', async () => {
    const headers = {
      'secret-key': envs.SECRET_KEY
    }
    const res = await req.put(requestPath).set(headers).send([])
    expect(res.statusCode).to.equal(400)
    expect(res.body).to.have.any.keys('message')
    expect(res.body.message).to.equal("Request body can't empty")
  })
})
