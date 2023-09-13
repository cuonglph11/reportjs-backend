import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import sinon from 'sinon'
import { time } from '~/utils/index'
import { envs } from '~/configs/index'
import {
  createFolderIfNotExist,
  createTXTFileToOrgFolder,
  createTXTFileToOrgFolderParams
} from './fs'

const sandbox = sinon.createSandbox()

describe('fs.ts', () => {
  afterEach(() => {
    sandbox.restore()
  })

  describe('createFolderIfNotExist()', () => {
    const folderName = path.join(__dirname, 'testCreateSingleFolder')
    const recursizeFolders = 'testCreateFolder/a/b/c/d'

    afterEach(() => {
      _rmfolder(folderName)
      _rmfolder(recursizeFolders)
    })

    it('Should create folder if not exist', () => {
      createFolderIfNotExist(folderName)
      expect(fs.existsSync(folderName)).true
    })

    it('Should create nested folders', () => {
      createFolderIfNotExist(recursizeFolders)
      expect(fs.existsSync(recursizeFolders))
    })
  })

  describe('createTXTFileToOrgFolder()', () => {
    afterEach(() => {
      _rmfolder(envs.TXT_DUM_FOLDER)
    })
    it('Should create txt file to org/station/date folder', () => {
      // const txtContent = sinon.stub(formater, 'json2Txt').returned('txtContent')
      const fakeReceivedAt = new Date().toISOString()
      const fakeInput: createTXTFileToOrgFolderParams = {
        orgKey: 'fakeorg',
        stationKey: 'fakestation',
        receivedAt: fakeReceivedAt,
        measures: [
          {
            parameter: 'ph',
            unit: 'mg/L',
            value: 20,
            timestamp: fakeReceivedAt,
            statusDevice: '00'
          }
        ]
      }

      const rdTime = sandbox.replace(
        time,
        'formatPayloadTime',
        sandbox.fake.returns(new Date().toISOString())
      )
      console.log(rdTime)
      const rootFolder = envs.TXT_DUM_FOLDER
      const orgFolderName = fakeInput.orgKey.toUpperCase()
      const stationFolderName = fakeInput.stationKey
      const dateFolderName = sandbox.replace(
        time,
        'formatDateFolder',
        sandbox.fake.returns('dateFolderName')
      )
      const filename = `${fakeInput.stationKey}_${fakeReceivedAt}.txt`

      createTXTFileToOrgFolder(fakeInput)

      const finalFilenamePath = `${rootFolder}/${orgFolderName}/${stationFolderName}/${dateFolderName()}/${filename}`
      expect(fs.existsSync(finalFilenamePath)).true
    })
  })
})

function _rmfolder(folderPath: string) {
  fs.rmSync(folderPath, { recursive: true, force: true })
}
