# NestJS

## Installation

```bash
$ npm install
```
## Test

```bash
# unit tests
$ npm run test
```

# Bug Report

## Current behavior
`TwoService` calls a function from `OneService` and a function from `ThreeService` which also calls a function from `OneService`.
When mocking `OneService` in the Unit tests for `TwoService`, `module.get(OneService)` returns the *actual* `OneService` and not the *mocked* `OneService`.

## Input Code
### Scenario 1
[Sample project](https://github.com/fw623/nestjs-mock-spy-bug/tree/master) with `ThreeService` having a dependency to `OneService`
```
 FAIL  src/two/two.service.spec.ts
  TwoService
    √ should be defined (2ms)
    different spies
      × when spying on oneService from module.get() (3ms)
      × when spying on OneService.prototype (1ms)
      √ when spying on OneServiceMock.prototype (1ms)

[Nest] 3256   - 09/14/2019, 06:07:17   OneService doOneThing()
[Nest] 3256   - 09/14/2019, 06:07:17   ^ from module.get() +1ms
[Nest] 3256   - 09/14/2019, 06:07:17   OneServiceMock doOneThing() +3ms
[Nest] 3256   - 09/14/2019, 06:07:17   OneServiceMock doOneThing() +3ms
[Nest] 3256   - 09/14/2019, 06:07:17   OneServiceMock doOneThing() +1ms
```

### Scenario 2
[Branch](https://github.com/fw623/nestjs-mock-spy-bug/tree/without-oneservice-in-threeservice) with `ThreeService` **not** having a dependecy to `OneService` (working as expected)
```
 FAIL  src/two/two.service.spec.ts
  TwoService
    √ should be defined (2ms)
    different spies
      √ when spying on oneService from module.get() (1ms)
      × when spying on OneService.prototype (3ms)
      × when spying on OneServiceMock.prototype (1ms)

[Nest] 10996   - 09/14/2019, 05:54:37   OneServiceMock doOneThing()
[Nest] 10996   - 09/14/2019, 05:54:37   ^ from module.get() +0ms
[Nest] 10996   - 09/14/2019, 05:54:37   OneServiceMock doOneThing() +4ms
[Nest] 10996   - 09/14/2019, 05:54:37   OneServiceMock doOneThing() +1ms
[Nest] 10996   - 09/14/2019, 05:54:37   OneServiceMock doOneThing() +2ms
```

## Expected behavior
It correctly calls the `ObjectServiceMock` in both scenarios. I would expect `module.get(ObjectService)` to return `ObjectServiceMock` instead of `ObjectService` in *Scenario 1* (just like in *Scenario 2*).

## Possible Solution
<!--- Only if you have suggestions on a fix for the bug -->

## Workaround
Spying on the prototype of the mocked Service.
In this example: `jest.spyOn(ObjectServiceMock.prototype, 'doOneThing')`

## Environment
<pre><code>Nest version: 6.6.4

For Tooling issues:
- Node version: v12.10.0
- Platform:  Windows
</code></pre>
