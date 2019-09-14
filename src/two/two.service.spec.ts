import { Test, TestingModule } from '@nestjs/testing';
import { TwoService } from './two.service';
import { OneService } from '../one/one.service';
import { ThreeModule } from '../three/three.module';
import { OneServiceMock } from '../mock';
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

    oneService.doOneThing()
    Logger.debug('^ from module.get()')
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should spy on OneServiceMock.doOneThing()', () => {
    it('when spying on oneService from module.get()', () => {
      const spy = jest.spyOn(oneService, 'doOneThing')
      service.doTwoThing()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('when spying on OneService.prototype', () => {
      const spy = jest.spyOn(OneService.prototype, 'doOneThing')
      service.doTwoThing()
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('when spying on OneServiceMock.prototype', () => {
      const spy = jest.spyOn(OneServiceMock.prototype, 'doOneThing')
      service.doTwoThing()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
});
