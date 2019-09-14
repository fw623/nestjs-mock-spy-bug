import { Module } from '@nestjs/common';
import { TwoService } from './two.service';
import { OneModule } from '../one/one.module';
import { ThreeModule } from '../three/three.module';

@Module({
  imports: [OneModule, ThreeModule],
  providers: [TwoService],
})
export class TwoModule {}
