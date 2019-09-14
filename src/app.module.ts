import { Module } from '@nestjs/common';
import { OneModule } from './one/one.module';
import { TwoModule } from './two/two.module';
import { ThreeModule } from './three/three.module';

@Module({
  imports: [OneModule, TwoModule, ThreeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
