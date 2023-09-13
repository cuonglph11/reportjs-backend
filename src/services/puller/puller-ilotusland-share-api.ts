import axios from 'axios'
import { formater } from '~/utils'
import type { Puller, PullerConfig } from './types'
import type { JsonFormatReturn, ShareAPIStation } from '~/utils/formater/type'

export default class IlotuslandShareAPI implements Puller {
  pullerKey: string
  config: PullerConfig

  constructor(pullerKey: string, config: PullerConfig) {
    this.pullerKey = pullerKey
    this.config = config
  }

  async getData(): Promise<(JsonFormatReturn | undefined)[]> {
    try {
      const res = await axios(this.config.requestConfig)
      const orgKey = this.config.orgKey
      const stations: ShareAPIStation[] = res.data
      const stationsFormatted = stations.map((station) => {
        return formater.formatShareAPIBody(orgKey, station)
      })
      return stationsFormatted
    } catch (error) {
      console.log(`Error when get data from org ${this.config.orgKey}`)
      throw error
    }
  }
}
