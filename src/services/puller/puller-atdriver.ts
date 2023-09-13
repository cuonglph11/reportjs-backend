import axios from 'axios'
import { formater } from '~/utils'
import type { Puller, PullerConfig } from './types'
import type { JsonData, JsonFormatReturn } from '~/utils/formater/type'

export default class ATDriver implements Puller {
  pullerKey: string
  config: PullerConfig

  constructor(pullerKey: string, config: PullerConfig) {
    this.pullerKey = pullerKey
    this.config = config
  }

  async getData(): Promise<(JsonFormatReturn | undefined)[]> {
    try {
      const res = await axios(this.config.requestConfig)
      if (res.status >= 400) {
        throw new Error('URL is not found')
      }
      const stations: JsonData[] = res.data
      return formater.JsonFormat(stations)
    } catch (error) {
      console.log(`Error when get data from org ${this.config.orgKey}`)
      throw error
    }
  }
}
