import type { IErrorResponse } from '~/types'

export default class ErrorResponse extends Error {
  code: number
  constructor({ code, message }: IErrorResponse) {
    super(message)
    this.code = code
  }
}
