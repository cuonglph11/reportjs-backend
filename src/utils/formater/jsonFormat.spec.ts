import { expect } from 'chai'
import moment from 'moment'
import JsonFormat from './jsonFormat'
import { getTransferStatusCode } from './helper'
import type { TransferStatus, JsonData, JsonFormatReturn } from './type'

export default function () {
  describe('getTransferStatusCode()', () => {
    it('Should return correct status device', () => {
      const goodStatus: TransferStatus = 'GOOD'
      expect(getTransferStatusCode(goodStatus)).to.equal('00')

      const badStatus: TransferStatus = 'BAD'
      expect(getTransferStatusCode(badStatus)).to.equal('02')
    })
    it('Should return "02" when param is undefined', () => {
      expect(getTransferStatusCode()).to.equal('02')
    })
    it('Should return "02" when param is any string', () => {
      expect(getTransferStatusCode()).to.equal('02')
    })
  })

  describe('JsonFormat()', () => {
    it('Should return empty string when args is [] or undefined', () => {
      expect(() => JsonFormat()).throw(Error, 'Not any stations')
      expect(() => JsonFormat([])).throw(Error, 'Not any stations')
    })

    it('Should return correct format', () => {
      const faketime = moment().format()
      const fakeJsonData: JsonData = {
        organizationId: 'vag',
        stationId: 'ilotusland',
        parameter: 'pH',
        value: 22,
        unit: 'mg/L',
        status: 'GOOD',
        timeStamp: faketime
      }

      const result: JsonFormatReturn = {
        organizationId: fakeJsonData.organizationId,
        stationId: fakeJsonData.stationId,
        receivedAt: faketime,
        measures: [
          {
            parameter: fakeJsonData.parameter,
            unit: fakeJsonData.unit,
            value: fakeJsonData.value,
            timestamp: faketime,
            statusDevice: '00'
          }
        ]
      }
      expect(JsonFormat([fakeJsonData])).to.eql([result])
    })

    it('Should ignore if station or organization missing', () => {
      const faketime = moment().format()
      const fakeJsonData: JsonData[] = [
        {
          organizationId: 'vag',
          stationId: '',
          parameter: 'pH',
          value: 22,
          unit: 'mg/L',
          status: 'GOOD',
          timeStamp: faketime
        },
        {
          organizationId: '',
          stationId: 'ilotusland',
          parameter: 'pH',
          value: 22,
          unit: 'mg/L',
          status: 'GOOD',
          timeStamp: faketime
        },
        {
          organizationId: 'vag',
          stationId: 'ilotusland',
          parameter: 'pH',
          value: 22,
          unit: 'mg/L',
          status: 'GOOD',
          timeStamp: faketime
        },
        {
          organizationId: 'vag',
          stationId: 'ilotusland',
          parameter: 'TSS',
          value: 5,
          unit: 'mg/L',
          status: 'BAD',
          timeStamp: faketime
        }
      ]

      const result: JsonFormatReturn[] = [
        {
          organizationId: 'vag',
          stationId: 'ilotusland',
          receivedAt: faketime,
          measures: [
            {
              parameter: 'pH',
              value: 22,
              unit: 'mg/L',
              timestamp: faketime,
              statusDevice: '00'
            },
            {
              parameter: 'TSS',
              value: 5,
              unit: 'mg/L',
              timestamp: faketime,
              statusDevice: '02'
            }
          ]
        }
      ]

      expect(JsonFormat(fakeJsonData)).to.eql(result)
    })
  })
}
