import fs from 'fs'
import path from 'path'
import { envs } from '~/configs'
import { time, formater } from '~/utils'
import { Measuring } from '~/utils/formater/type'

const TXT_DUM_FOLDER = envs.TXT_DUM_FOLDER

export function createFolderIfNotExist(folderName: string) {
  fs.mkdirSync(folderName, { recursive: true })
}

export type createTXTFileToOrgFolderParams = {
  orgKey: string
  stationKey: string
  receivedAt: string
  measures: Measuring[]
}

export function createTXTFileToOrgFolder({
  orgKey,
  stationKey,
  receivedAt,
  measures
}: createTXTFileToOrgFolderParams) {
  const rdTime = time.formatPayloadTime(receivedAt)
  const filename = `${stationKey}_${rdTime}`
  const orgFolderName = orgKey.toUpperCase()
  const stationFolderName = stationKey
  const dateFolderName = time.formatDateFolder()
  const txtContent = formater.json2Txt(measures)

  const folderPath = path.join(
    TXT_DUM_FOLDER,
    orgFolderName,
    stationFolderName,
    dateFolderName
  )
  createFolderIfNotExist(folderPath)

  const filePath = path.join(folderPath, filename) + '.txt'
  fs.writeFileSync(filePath, txtContent)

  console.log(`write to: ${filePath}`)
}
