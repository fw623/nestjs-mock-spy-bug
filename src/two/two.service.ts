import { Injectable } from '@nestjs/common';
import { OneService } from '../one/one.service';
import { ThreeService } from '../three/three.service';

@Injectable()
export class TwoService {
  constructor(
    private oneService: OneService,
    private threeService: ThreeService) {}

  doTwoThing() {
    this.oneService.doOneThing()
  }

  doTwoThing2() {
    this.threeService.doThreeThing()
  }
}
