import { envs } from '~/configs'
import { cronjob, fs, rabbitmq } from '~/services'
import type { Puller } from './types'

class PullerController {
  private pullers = new Map<string, Puller>()

  addPuller(puller: Puller) {
    this.pullers.set(puller.pullerKey, puller)
    return true
  }

  getPullers() {
    const result: Partial<Puller>[] = []
    for (const puller of this.pullers.values()) {
      const { pullerKey, config } = puller
      result.push({ pullerKey, config })
    }
    return result
  }

  removePuller(pullerKey: string) {
    return this.pullers.delete(pullerKey)
  }

  clearPullers() {
    this.pullers.clear()
    return true
  }

  async start() {
    console.log('Puller started ....')
    cronjob.startIntervalByMinute(
      envs.PULL_INTERVAL_MINUTE,
      this._pullData.bind(this)
    )
  }

  async _pullData() {
    const pullers = this.pullers

    if (pullers.size === 0) {
      console.log('Not any puller configs')
      return
    }

    for await (const puller of pullers.values()) {
      const stationsFormatted = await puller.getData()
      for (const value of stationsFormatted) {
        if (!value) continue
        fs.createTXTFileToOrgFolder({
          orgKey: value.organizationId,
          stationKey: value.stationId,
          receivedAt: value.receivedAt,
          measures: value.measures
        })
        rabbitmq.sendToRawExchange(value)
      }
    }
  }
}

export const Controller = new PullerController()
