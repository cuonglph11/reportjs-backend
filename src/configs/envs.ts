import { loadenv } from '~/utils'


/* 
  APP envs
*/
type NodeEnv = 'development' | 'production' | 'test'

export const NODE_ENV = loadenv<NodeEnv>('NODE_ENV', 'development')
export const IS_DEV = NODE_ENV === 'development'
export const IS_PROD = NODE_ENV === 'production'
export const IS_TEST = NODE_ENV === 'test'

export const NODE_PORT = loadenv<number>('NODE_PORT', 6000)


export const GRACEFUL_SHUTDOWN_SIGNALS = loadenv<NodeJS.Signals[]>(
  'EVENT_GRACEFUL_SHUTDOWN',
  ['SIGTERM', 'SIGINT']
)



/**
 * REPORT JS CONFIG
 */

export const REPORT_CONFIG = [
  {
    "id": 1,
    "name": "ENVIROMENT MANAGEMENT SYSTEM (EMS) REPORT",
    "templatePath": "Historical Data",
    "variables": {
      "address": "Ho Chi Minh",
      "companyName": "iLotusLand"
    },
    "data": [
      "HISTORICAL_DATA",
      "HISTORICAL_SUMMARY"
    ]
  },
  {
    "id": 2,
    "name": "Historical data report",
    "templatePath": "Historical Data",
    "variables": {
      "address": "Ho Chi Minh"
    },
    "data": [
      "STATIONS",
      "HISTORICAL"
    ]
  }
]