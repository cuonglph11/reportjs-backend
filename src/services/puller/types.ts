import type { JsonFormatReturn } from '~/utils/formater/type'
import type { AxiosRequestConfig } from 'axios'

export type PullerSource = 'IlotuslandShareAPI' | 'ATDriver'

export interface Puller {
  pullerKey: string
  config: PullerConfig
  getData(): Promise<(JsonFormatReturn | undefined)[]>
}

export interface PullerConfig {
  source: PullerSource
  orgKey: string
  requestConfig: AxiosRequestConfig
}
