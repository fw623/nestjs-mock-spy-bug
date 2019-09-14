import { Module } from '@nestjs/common';
import { ThreeService } from './three.service';
import { OneModule } from '../one/one.module';

@Module({
  imports: [OneModule],
  providers: [ThreeService],
  exports: [ThreeService],
})
export class ThreeModule {}
