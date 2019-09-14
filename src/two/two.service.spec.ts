import { Test, TestingModule } from '@nestjs/testing';
import { TwoService } from './two.service';
import { OneService } from '../one/one.service';
import { ThreeModule } from '../three/three.module';
import { OneServiceMock } from '../classes';
import { Logger } from '@nestjs/common';

describe('TwoService', () => {
  let module: TestingModule
  let service: TwoService;
  let oneService: OneService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ThreeModule],
      providers: [TwoService, {
        provide: OneService,
        useClass: OneServiceMock,
      }],
    }).compile();

    service = module.get<TwoService>(TwoService);
    oneService = module.get<OneService>(OneService)
    Logger.debug(oneService)
  });

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should spy on OneServiceMock.doOneThing()', () => {
    // not working when spying on service from module.get()
    // (it spies on actual OneService because oneService is an instance of OneService)
    const spy = jest.spyOn(oneService, 'doOneThing')
    service.doTwoThing()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call OneServiceMock.doOneThing()', () => {
    // working when spying on mocked Service
    const spy = jest.spyOn(OneServiceMock.prototype, 'doOneThing')
    service.doTwoThing()
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
