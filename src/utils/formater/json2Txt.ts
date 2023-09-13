import { time } from '~/utils'
import { Measuring } from './type'

export default function json2Txt(measures?: Measuring[]) {
  let content = ''

  if (!measures) return content

  measures.forEach((item) => {
    const { parameter, value, unit, timestamp, statusDevice } =
      _parseMeasureItem(item)

    /* dùng \t và thứ tự các field theo thông tư 24 */
    content += `${parameter}\t${value}\t${unit}\t${timestamp}\t${statusDevice}\n`
  })

  return content
}

export function _parseMeasureItem(item: Measuring) {
  const value = typeof item.value !== 'number' ? '' : `${item.value}`
  const unit = item.unit || ''
  const statusDevice = item.statusDevice || ''
  const parameter = item.parameter || ''
  const timestamp = item.timestamp ? time.formatPayloadTime(item.timestamp) : ''
  return { value, unit, statusDevice, parameter, timestamp }
}
