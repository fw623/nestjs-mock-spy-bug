import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OneService {
  doOneThing() {
    Logger.debug('OneService doOneThing()')
  }
}
