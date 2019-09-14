import { Module } from '@nestjs/common';
import { ThreeService } from './three.service';

@Module({
  providers: [ThreeService],
  exports: [ThreeService],
})
export class ThreeModule {}
