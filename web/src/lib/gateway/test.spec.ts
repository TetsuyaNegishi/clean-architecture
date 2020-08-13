import { TestGateway } from './test'
import { TestDriver } from '../driver/test'
import { Test } from '../domain/test';

jest.mock('../driver/test');
const TestDriverMock = TestDriver as jest.Mock;

describe('TestGateway', () => {
  it('fetch success', async () => {
    TestDriverMock.mockImplementationOnce(() => {
      return {
        fetch: async () => {
          return {text: 'test'};
        },
    };
    })

    const expected = new Test('test')

    const gateway = new TestGateway(new TestDriver())
    const actual = await gateway.fetch();

    expect(actual).toEqual(expected)
  });

  it('fail to fetch', async () => {
    TestDriverMock.mockImplementationOnce(() => {
      return {
        fetch: async() => {
          return new Error()
        }
      }
    })

    const gateway = new TestGateway(new TestDriver())
    const actual = await gateway.fetch();

    expect(actual instanceof Error).toBe(true)
  });

})
