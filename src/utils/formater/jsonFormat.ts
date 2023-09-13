import { JsonData, JsonFormatReturn, Measuring } from './type'
import { getTransferStatusCode } from './helper'

export default function JsonFormat(jsonData?: JsonData[]) {
  if (!jsonData || jsonData.length < 1) {
    throw new Error('Not any stations')
  }

  const result: Map<string, JsonFormatReturn> = new Map()

  jsonData.forEach((item) => {
    /* hiện tại không dùng unit */
    /* sample jsonData format
         [
          {
            "organizationId": "Hanoi",
            "stationId": "hoankim",
            "parameter": "COD",
            "value": 0.0,
            "unit": "mg/L"
            "status": "GOOD",
            "timeStamp": "2022-06-06T15:33:57+07:00"
         },
         {
            "organizationId": "Hanoi",
            "stationId": "thudo",
            "parameter": "COD",
            "value": 0.0,
            "unit": "mg/L"
            "status": "GOOD",
            "timeStamp": "2022-06-06T15:33:57+07:00"
         },
        ]
    */
    const { organizationId, stationId } = item
    if (!organizationId || !stationId) return
    const mapKey = `${organizationId}_${stationId}`
    if (!result.has(mapKey)) {
      result.set(mapKey, {
        organizationId,
        stationId,
        receivedAt: item.timeStamp,
        measures: []
      })
    }
    const { parameter, value, unit } = item
    const measure: Measuring = {
      parameter,
      unit,
      value,
      timestamp: item.timeStamp,
      statusDevice: getTransferStatusCode(item.status)
    }
    const resultItem = result.get(mapKey)
    if (!resultItem) return
    resultItem.measures.push(measure)
  })

  return Array.from(result.values())
}
