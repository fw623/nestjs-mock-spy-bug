import { Injectable } from '@nestjs/common';
import { OneService } from '../one/one.service';

@Injectable()
export class ThreeService {
  constructor(private oneService: OneService) {}

  doThreeThing() {
    this.oneService.doOneThing()
  }
}
