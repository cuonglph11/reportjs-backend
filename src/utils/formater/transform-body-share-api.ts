import { JsonFormatReturn, Measuring, ShareAPIStation } from './type'

export default function formatShareAPIBody(
  organizationId?: string,
  station?: ShareAPIStation
): JsonFormatReturn | undefined {
  if (!station || !organizationId) return

  const result: JsonFormatReturn = {
    organizationId,
    stationId: station.key,
    receivedAt: station.receivedAt,
    measures: _transformMeasure(station)
  }

  return result
}

export function _transformMeasure(station: ShareAPIStation): Measuring[] {
  const result: Measuring[] = []
  for (const measure of Object.values(station.measuringLogs)) {
    const obj: Measuring = {}
    obj.parameter = measure.key
    obj.value = measure.value
    obj.statusDevice = _transformStatusDevice(measure.statusDevice)
    obj.timestamp = station.receivedAt
    obj.unit = measure.unit
    result.push(obj)
  }
  return result
}

export function _transformStatusDevice(status: number) {
  switch (status) {
    case 0:
      return '00'
    case 1:
      return '01'
    case 2:
      return '02'
    default:
      return '02'
  }
}
