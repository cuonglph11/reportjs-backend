// import { Chalk } from 'chalk'
import chalk from 'chalk'
// const chalk = new Chalk()

export function envError<T>(env: T) {
  return chalk.redBright(`env ${env} is missing`)
}
