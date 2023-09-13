import { expect } from 'chai'
import getEnv from './envs'

describe('getEnv()', () => {
  it('Should NODE_ENV is test', () => {
    expect(getEnv('NODE_ENV')).to.equal('test')
  })
  // it('Should load default value if not found', () => {
  //   expect(loadEnv<string>('TEST_NOT_FOUND', '')).to.equal('')
  //   expect(loadEnv<number>('TEST_NOT_FOUND', 2000)).to.equal(2000)
  // })
})
