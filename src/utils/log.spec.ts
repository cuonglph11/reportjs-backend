import { expect } from 'chai'
import { envError } from './log'

describe('utils/log', () => {
  it('envError()', () => {
    envError('fdasf')
    expect(true).true
  })
})
