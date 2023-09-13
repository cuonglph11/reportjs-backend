import { StatusDeviceCode, TransferStatus } from './type'

export function getTransferStatusCode(key?: TransferStatus | string): StatusDeviceCode {
  switch (key) {
    case 'GOOD':
      return '00'
    case 'BAD':
      return '02'
    default:
      return '02'
  }
}
