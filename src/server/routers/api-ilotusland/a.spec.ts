import { expect } from 'chai'
import { Request, Response } from 'express'
import sinon from 'sinon'
import ErrorResponse from '~/utils/response'
import validateBody from './validate-body.middleware'

const sandbox = sinon.createSandbox()

describe('validate-body-middleware', () => {
  // let mockRequets: Partial<Request>
  // let mockResponse: Partial<Response>
  // let mockNext: Partial<NextFunction>

  beforeEach(() => {
    // mockRequets = {}
    // mockResponse = {}
    // mockNext = sandbox.spy()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it.skip('Should call next with error reqpose', () => {
    // mockRequets.body = {}
    const next = sandbox.spy()
    const req: Partial<Request> = { body: {} }
    const res: Partial<Response> = {}
    validateBody(req as Request, res as Response, next)

    const error = new ErrorResponse({
      code: 400,
      message: 'Request body format: [{...}, {...}]'
    })

    expect(next.callCount).to.equal(1)
    expect(next.calledWith(error)).true
  })
})
