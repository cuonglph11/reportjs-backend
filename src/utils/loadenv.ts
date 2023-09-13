import { log } from '~/utils'

export default function loadenv<T>(name: string, defaultValue: T, required = true): T {
  const value = (process.env[name] || defaultValue) as T
  if (required && !value) {
    throw new Error(log.envError(name))
  }
  return value
}
