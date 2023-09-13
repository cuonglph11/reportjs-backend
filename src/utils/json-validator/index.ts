import Ajv from 'ajv'
import { Measuing } from './schemas'
const ajv = new Ajv()
ajv.addSchema(Measuing, 'measuing')

export default ajv
