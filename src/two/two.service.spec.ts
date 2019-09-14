import { Test, TestingModule } from '@nestjs/testing';
import { TwoService } from './two.service';
import { OneService } from '../one/one.service';
import { ThreeModule } from '../three/three.module';
import { OneServiceMock } from '../classes';

describe('TwoService', () => {
  let service: TwoService;
  let oneService: OneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThreeModule],
      providers: [TwoService, {
        provide: OneService,
        useClass: OneServiceMock,
      }],
    }).compile();

    service = module.get<TwoService>(TwoService);
    oneService = module.get<OneService>(OneService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call OneServiceMock.doOneThing()', () => {
    const originalSpy = jest.spyOn(oneService, 'doOneThing')

    service.doTwoThing()

    expect(originalSpy).toHaveBeenCalledTimes(1)
  })
});
