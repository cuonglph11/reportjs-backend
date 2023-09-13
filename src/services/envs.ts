import { envs } from '~/configs'

type Envs = keyof typeof envs

export default function getEnv(name: Envs) {
  return envs[name]
}
