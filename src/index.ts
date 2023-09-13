import { app as express } from '~/server'
import { envs } from '~/configs'

const PORT = envs.NODE_PORT

const server = express.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
)


const GRACEFUL_SHUTDOWN_SIGNALS = envs.GRACEFUL_SHUTDOWN_SIGNALS
GRACEFUL_SHUTDOWN_SIGNALS.forEach((signal) => {
  process.once(signal, () => {
    console.log('Closing server connection')
    server.close()
    console.log('Server connection was closed')
    process.exit()
  })
})