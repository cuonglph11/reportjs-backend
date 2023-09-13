import express from 'express'
import cors from 'cors'
// import helmet from 'helmet'
import morgan from 'morgan'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('@jsreport/nodejs-client')('http://localhost:5488')
import { envs } from '~/configs'

import { errorHandle, parseBodyStringToJson } from './middlewares'
import { DataSourceType, ReportFilter } from '~/services/data-mapping/type'
import { getDatasourceByType } from '~/utils/datasources'
import { getFetch, postFetch } from '~/utils/request'
import { formatDate } from '~/utils/formater/datetime'

const app = express()

app.use(cors())
// app.use(helmet())
app.use(express.text(), parseBodyStringToJson)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (envs.IS_DEV) {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send({
    name: 'Welcome to ReportJS config Service',
    version: '0.0.1'
  })
})
app.get('/ping', (req, res) => res.send('pong'))

app.get('/config', (req, res) => {
  const data = envs.REPORT_CONFIG
  return res.send({
    success: true,
    data
  })
})

type ReportConfig = {
  name: string
  templatePath: string
  variables: { [key: string]: unknown }
  data: DataSourceType[]
}

const convertData = (rawData: unknown) => {
  const historicalData = rawData.data.map((item: any) => {
    const meaLogs = {}
    Object.keys(item.measuringLogs).forEach((key) => {
      meaLogs[key] = item.measuringLogs[key].value
    })
    return {
      time: formatDate(item.receivedAt),
      ...meaLogs
    }
  })
  return {
    HISTORICAL_DATA: historicalData,
    HISTORICAL_SUMMARY: []
  }
}

type HistoricalDataParams = {
  measures: string[]
  from: string
  to: string
  stationKey: string
}
const getHistoricalData = ({
  measures,
  from,
  to,
  stationKey
}: HistoricalDataParams) => {
  return postFetch(
    `https://demo-api.ilotusland.asia/data-insight/report/data-original/${stationKey}`,
    {
      measuringList: measures,
      statusDevice: ['Error', 'Calibration', 'Good'],
      dataType: 'origin',
      from: from,
      to: to,
      page: 1,
      itemPerPage: 1000,
      standards: '',
      conditions: []
    }
  )
}

app.post('/search', async (req, res) => {
  // console.log(req.body, 'bodyyyyy')
  const reportConfig: ReportConfig = req.body.configs
  const filters: ReportFilter = req.body.filters
  const measures = filters.params
  const stationKey = filters.stations[0]
  const from = filters.from
  const to = filters.to
  const templatePath = reportConfig.templatePath
  const variables = reportConfig.variables

  const rawData = await getHistoricalData({ measures, from, to, stationKey })

  const cleanData = convertData(rawData)
  const dataGenReport = {
    template: {
      name: templatePath
    },
    data: {
      // "HISTORICAL_DATA": [],
      HISTORICAL_DATA: cleanData.HISTORICAL_DATA,
      ...variables
    }
  }
  // return res.send(cleanData)
  const response = await client.render(dataGenReport)
  return response.pipe(res)
})

app.use(errorHandle)

export { app }
