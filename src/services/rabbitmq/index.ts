import amqplib from 'amqplib'
import { envs } from '~/configs'
import { JsonFormatReturn } from '~/utils/formater/type'

// const connectOptions: amqplib.Options.Connect = {
//   // protocol: 'amqp',
//   hostname:
//     'a232e5dc1f76646f8b5ea946bf76767f-1992579615.ap-southeast-1.elb.amazonaws.com', //'localhost',
//   // port: 5672,
//   username: 'admin',
//   password: 'c773d81d1f6b1d7bb58bd3b30f732a12',
//   // locale: 'en_US',
//   // frameMax: 0x1000, /* (4kb) */
//   // heartbeat: 0,
//   vhost: '/ilotusland'
// }

const RABBIT_EXCHANGE_NAME = envs.RABBIT_EXCHANGE_NAME
const RABBIT_QUEUE_NAME = envs.RABBIT_QUEUE_NAME

let channel: amqplib.Channel | undefined

async function start() {
  return (
    amqplib
      // .connect(connectOptions)
      .connect(
        `${envs.RABBIT_PROTOCOL}://${envs.RABBIT_USER}:${envs.RABBIT_PASS}@${envs.RABBIT_HOST}:${envs.RABBIT_PORT}/${envs.RABBIT_VHOST}`
      )
      .then(_onConnection)
      .catch((error) => {
        const _errMsg = (error as Error).message
        _logRabbit(_errMsg)
      })
  )
}

type rawDataMeasure = {
  [k: string]: { value: number; statusDevice: string }
}
type rawData = {
  organizationId: string
  datasourceKey: string
  receivedAt: string
  measuringLogs: rawDataMeasure
}
function sendToRawExchange(value: JsonFormatReturn) {
  if (!channel) {
    return console.log('Channel not initial')
  }

  const dataSentToRabbit: rawData = {
    organizationId: value.organizationId,
    datasourceKey: value.stationId,
    receivedAt: value.receivedAt,
    measuringLogs: {}
  }

  value.measures.forEach((measure) => {
    if (!measure.parameter) return
    if (!measure.value) return
    dataSentToRabbit.measuringLogs[measure.parameter] = {
      value: measure.value,
      statusDevice: measure.statusDevice
    }
  })

  channel.publish(
    RABBIT_EXCHANGE_NAME,
    '',
    Buffer.from(JSON.stringify(dataSentToRabbit))
  )
}

function _logRabbit(...msgs: unknown[]) {
  console.log('RABBITMQ |', ...msgs)
}

async function _onConnection(connection: amqplib.Connection) {
  _logRabbit('Connnect success!')
  const ch = await connection.createChannel()
  ch.prefetch(1)
  ch.on('error', (msg) => {
    console.log(msg)
  })

  const { exchange } = await ch.assertExchange(RABBIT_EXCHANGE_NAME, 'fanout')
  const { queue } = await ch.assertQueue(RABBIT_QUEUE_NAME, { durable: true })

  await ch.bindQueue(queue, exchange, '')

  channel = ch

  ch.consume(queue, (msg) => {
    if (!msg) return
    try {
      const data = JSON.parse(msg.content.toString())
      console.log(data)
      ch.ack(msg)
    } catch (error) {
      console.log(error)
      ch.ack(msg)
    }
  })
}
export { start, sendToRawExchange }
