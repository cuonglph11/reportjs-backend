import { initial } from 'lodash'
import { convertIdToKey } from '~/utils/ill-converter'
import { DataSourceType, ReportFilter } from './type'

export class BaseDataSourceTypeMapping {
  defaultKey: DataSourceType = 'HISTORICAL_DATA'
  key?: DataSourceType
  baseUrl: string
  filters?: ReportFilter
  body?: any
  method: 'GET' | 'POST'
  endpoint: string

  constructor(key?: DataSourceType, filters?: ReportFilter) {
    this.key = key
    this.filters = filters
    this.baseUrl = `https://demo-api.ilotusland.asia`
    this.method = 'GET'
    this.endpoint = this.baseUrl
  }
}

interface IBody {
  buildBody(): any
  init(): Promise<void>
}
export class HistoricalData extends BaseDataSourceTypeMapping implements IBody {
  stationKey?: string

  constructor(filters?: ReportFilter) {
    super('HISTORICAL_DATA', filters)
    this.method = 'POST'
    this.filters = filters
    this.buildBody()
  }
  async init() {
    const stationId = this.filters?.stations[0] || ''
    const stationKey = await convertIdToKey(stationId)
    this.stationKey = stationKey
    this.endpoint = `${this.baseUrl}/data-insight/report/data-original/${this.stationKey}`
  }
  buildBody() {
    this.body = {
      measuringList: this.filters?.params,
      dataType: 'origin',
      from: this.filters?.from,
      to: this.filters?.to,
      page: 1,
      itemPerPage: 1000,
      standards: '',
      conditions: []
    }
    return this
  }
}
