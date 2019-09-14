import { Logger } from '@nestjs/common'

export class OneServiceMock {
  doOneThing() {
    Logger.debug('OneServiceMock doOneThing()')
  }
}
