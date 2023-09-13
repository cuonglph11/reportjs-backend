import { JSONSchemaType } from 'ajv'
import { Measuring } from '~/utils/formater/type'

const measuringSchema: JSONSchemaType<Measuring> = {
  type: 'object',
  properties: {
    parameter: { type: 'string', nullable: true },
    unit: { type: 'string', nullable: true },
    value: { type: 'number', nullable: true },
    timestamp: { type: 'string', nullable: true },
    statusDevice: { type: 'string', nullable: true }
  },
  minProperties: 5,
  additionalProperties: false
}

export default measuringSchema
