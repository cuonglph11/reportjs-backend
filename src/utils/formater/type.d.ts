export type StatusDeviceCode = '00' | '01' | '02'
export type TransferStatus = 'GOOD' | 'BAD'

export type Measuring = {
  parameter?: string
  unit?: string
  value?: number | null
  timestamp?: string
  statusDevice?: StatusDeviceNumber
}

export type JsonData = {
  organizationId: string
  stationId: string
  parameter: string
  value: number
  unit?: string
  status: TransferStatus
  timeStamp: string
}

export type JsonFormatReturn = {
  organizationId: string
  stationId: string
  receivedAt: string
  measures: Measuring[]
}

export type ShareAPIMeasuring = {
  key: string
  unit: string
  value: number
  statusDevice: number
  [k: string]: unknown
}

export type ShareAPIStation = {
  key: string
  receivedAt: string
  measuringLogs: {
    [k: string]: ShareAPIMeasuring
  }
  [k: string]: unknown
}
