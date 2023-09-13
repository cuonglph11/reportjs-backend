import { expect } from 'chai'
import moment from 'moment'
import { envs } from '~/configs'
import { fileNameFormat, formatPayloadTime, timestamp, formatDateFolder, getUTC7 } from './time'

describe('utils/time', () => {
  describe('getUTC7()', () => {
    it('Should return time with UTC +7', () => {
      const result = getUTC7()
      const utc7fromutc3 = getUTC7(moment().utcOffset(3))
      const utc7fromutc10 = getUTC7(moment().utcOffset(10))
      expect(result.utcOffset()).to.equal(420)
      expect(utc7fromutc3.utcOffset()).to.equal(420)
      expect(utc7fromutc10.utcOffset()).to.equal(420)
    })
  })

  describe('timestamp()', () => {
    it('Should return correct format string', () => {
      const result = timestamp()

      const date = moment(result, envs.DATE_TIME_FORMAT)
      const year = date.year()
      const month = date.format('MM')
      const day = date.format('DD')
      const hour = date.format('HH')
      const minute = date.format('mm')
      const second = date.format('ss')

      expect(result).to.equal(`${day}/${month}/${year} ${hour}:${minute}:${second}`)
    })
  })

  describe('formatPayloadTime()', () => {
    it('Should return correct format string', () => {
      const date = moment()
      const year = date.year()
      const month = date.format('MM')
      const day = date.format('DD')
      const hour = date.format('HH')
      const minute = date.format('mm')
      const second = '00'

      const dateString = date.toISOString()
      const result = formatPayloadTime(dateString)
      expect(result).to.equal(`${year}${month}${day}${hour}${minute}${second}`)
    })
  })

  describe('fileNameFormat()', () => {
    it('Should return correct format string', () => {
      const date = moment().utcOffset('+07:00')
      const year = date.year()
      const month = date.format('MM')
      const day = date.format('DD')
      const hour = date.format('HH')
      const minute = date.format('mm')
      const result = fileNameFormat()
      expect(result).to.equal(`${year}${month}${day}${hour}${minute}00`)
    })
  })

  describe('formatDateFolder()', () => {
    it('Should return correct format time YYYYMMDD', () => {
      const result = formatDateFolder()
      const year = result.slice(0, 4)
      const month = result.slice(4, 6)
      const day = result.slice(6, 8)
      expect(result).to.equal(`${year}${month}${day}`)
      // test here
    })
  })
})
