import moment from 'moment'
import { envs } from '~/configs'

export function timestamp() {
  return moment().format(envs.DATE_TIME_FORMAT)
}

export function formatPayloadTime(time: string) {
  return moment(time).format(envs.DATE_TIME_FORMAT_TXT_FILE)
}

export function fileNameFormat() {
  return getUTC7().format(envs.DATE_TIME_FORMAT_TXT_FILE)
}

export function formatDateFolder() {
  return getUTC7().format(envs.DATE_TIME_FOLDER)
}

export function getUTC7(time = moment()) {
  return moment(time).utcOffset(7)
}
