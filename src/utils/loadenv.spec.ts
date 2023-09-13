import { expect } from 'chai'
import loadEnv from './loadenv'

describe('loadEnv()', () => {
  it('Should load env value if found', () => {
    process.env.TEST_MY_NAME = 'abc'
    expect(loadEnv<string>('TEST_MY_NAME', '')).to.equal('abc')
  })
  it('Should load default value if not found', () => {
    expect(loadEnv<string>('TEST_NOT_FOUND', '', false)).to.equal('')
    expect(loadEnv<number>('TEST_NOT_FOUND', 2000)).to.equal(2000)
  })
  it('Should throw error if required env is missing', () => {
    expect(() => loadEnv<string>('REQUIRED_NOT_FOUND', '')).throw(
      'env REQUIRED_NOT_FOUND is missing'
    )
  })
})
