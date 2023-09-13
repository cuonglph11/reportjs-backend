import { expect } from 'chai'
import moment from 'moment'
import { time } from '../index'
import json2txt, { _parseMeasureItem } from './json2Txt'
import type { Measuring } from './type'

export default function () {
  describe('_parseMeasureItem()', () => {
    it('Should return correct with valid params', () => {
      const params = {
        parameter: 'pH',
        value: 7,
        unit: 'abc',
        statusDevice: 'Good',
        timestamp: moment().format()
      }

      const result = _parseMeasureItem(params)
      for (const key of Object.keys(result)) {
        expect(typeof key).to.equal('string')
      }
    })
    it('Should return correct value 0', () => {
      const params = {
        parameter: 'pH',
        value: 0,
        unit: 'abc',
        statusDevice: 'Good',
        timestamp: moment().format()
      }

      const result = _parseMeasureItem(params)
      expect(result.value).to.equal('0')
    })
  })

  describe('json2Txt()', () => {
    it('Should return empty string when args is [] or undefined', () => {
      expect(json2txt()).to.equal('')
      expect(json2txt([])).to.equal('')
    })

    it('Should return correct format', () => {
      const timestamp = moment().format()

      const input: Measuring[] = [
        {
          parameter: 'pH',
          value: 7,
          unit: 'abc',
          statusDevice: 'Good',
          timestamp
        },
        {
          parameter: 'pH',
          value: 7,
          unit: 'abc',
          statusDevice: 'Good',
          timestamp
        }
      ]

      const outputTime = time.formatPayloadTime(timestamp)
      expect(json2txt(input)).to.equal(`pH\t7\tabc\t${outputTime}\tGood\npH\t7\tabc\t${outputTime}\tGood\n`)
    })
    it('Should return correct format on missing keys', () => {
      const input: Measuring[] = [
        {
          parameter: undefined,
          value: undefined,
          unit: undefined,
          statusDevice: undefined,
          timestamp: undefined
        }
      ]
      expect(json2txt(input)).to.equal(`\t\t\t\t\n`)
    })
  })
}
