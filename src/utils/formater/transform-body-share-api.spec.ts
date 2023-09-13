import { expect } from 'chai'
import formatShareAPIBody, {
  _transformStatusDevice,
  _transformMeasure
} from './transform-body-share-api'
import { ShareAPIStation, Measuring } from './type'

describe('transform-body-share-api.ts', () => {
  const fakeData: ShareAPIStation = {
    key: 'SongThan1',
    name: 'Sóng Thần 1',
    address: 'phường Dĩ An, TX Dĩ An, Bình Dương',
    mapLocation: {
      long: 106.742442,
      lat: 10.891601
    },
    province: {},
    stationType: {
      _id: '5d2c19b9a5ee840011434a89',
      name: 'Nước thải doanh nghiệp',
      key: 'NUOC_THAI_DOANH_NGHIEP'
    },
    receivedAt: '2022-08-16T13:45:00.000Z',
    measuringLogs: {
      COD: {
        key: 'COD',
        name: 'COD',
        unit: 'm3/h',
        maxLimit: 121.5,
        minLimit: null,
        value: 22.79,
        statusDevice: 0,
        warningLevel: 'GOOD'
      },
      pH: {
        key: 'pH',
        name: 'pH',
        unit: '',
        maxLimit: 14,
        minLimit: null,
        value: 6.08,
        statusDevice: 1,
        warningLevel: ''
      }
    }
  }
  const result: Measuring[] = [
    {
      parameter: 'COD',
      statusDevice: '00',
      timestamp: fakeData.receivedAt,
      unit: 'm3/h',
      value: 22.79
    },
    {
      parameter: 'pH',
      statusDevice: '01',
      timestamp: fakeData.receivedAt,
      unit: '',
      value: 6.08
    }
  ]

  describe('formatShareAPIBody()', () => {
    it('Should return undefined when not params', () => {
      expect(formatShareAPIBody()).to.be.undefined
    })

    it('Should return corrent result', () => {
      expect(formatShareAPIBody('abc', fakeData)).to.eql({
        organizationId: 'abc',
        stationId: fakeData.key,
        receivedAt: fakeData.receivedAt,
        measures: result
      })
    })
  })
  describe('_transformStatusDevice()', () => {
    it('Should return correct status device', () => {
      expect(_transformStatusDevice(0)).to.equal('00')
      expect(_transformStatusDevice(1)).to.equal('01')
      expect(_transformStatusDevice(2)).to.equal('02')
      expect(_transformStatusDevice(100)).to.equal('02')
    })
  })

  describe('_transformMeasure()', () => {
    it('Should return correct format', () => {
      expect(_transformMeasure(fakeData)).to.eql(result)
    })

    // it('Should return undefined when not argumetn', () => {
    //   expect(_transformMeasure()).to.undefined
    // })
  })
})
