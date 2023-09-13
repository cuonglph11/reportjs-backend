import { BaseDataSourceTypeMapping } from './helper'

export type ReportFilter = {
  stations: string[]
  id
  from: string
  to: string
  params: string[]
}

export type DataSourceType = 'STATIONS' | 'HISTORICAL_DATA'

export type DataSourceChildClass<T extends BaseDataSourceTypeMapping> =
  new () => T
