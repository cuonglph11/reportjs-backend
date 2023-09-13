import schedule from 'node-schedule'

export function startIntervalByMinute(minute: number, cb: () => void) {
  schedule.scheduleJob(`*/${minute} * * * *`, cb)
}
