import { expect } from 'chai'
import ErrorResponse from './response'

describe('utils/response', () => {
  it('Should new class have exactly members', () => {
    const params = {
      code: 700,
      message: 'fake message'
    }

    const error = new ErrorResponse(params)
    expect(error).to.have.any.keys(params)

    expect(error.message).to.equal(params.message)
    expect(error.code).to.equal(params.code)
  })
})
