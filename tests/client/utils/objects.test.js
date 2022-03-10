import { sortObjectKeys } from '../../../src/utils/objects'

describe('Test objects utility functions', () => {
  it('sort object keys', () => {
    const currentObject = {
      '2022-03-06_165': {
        items: [],
        subId: 254,
        deliveryDay: 3,
        status: 'locked',
        subscriptionDate: '2022-03-06',
        queryDate: '2022-03-06T08:00:00.000Z'
      },
      '2022-03-13_165': {
        items: [],
        subId: 254,
        status: 'pending',
        subscriptionDate: '2022-03-13',
        queryDate: '2022-03-13T08:00:00.000Z'
      },
      '2022-03-20_164': {
        items: [],
        subId: 253,
        status: 'pending',
        subscriptionDate: '2022-03-20',
        queryDate: '2022-03-20T07:00:00.000Z'
      },
      '2022-03-13_164': {
        items: [],
        subId: 253,
        status: 'pending',
        subscriptionDate: '2022-03-13',
        queryDate: '2022-03-13T08:00:00.000Z'
      },
      '2022-03-06_164': {
        items: [],
        subId: 253,
        deliveryDay: 3,
        status: 'locked',
        subscriptionDate: '2022-03-06',
        queryDate: '2022-03-06T08:00:00.000Z'
      }
    }

    const sorted = sortObjectKeys(currentObject)

    expect(Object.keys(sorted)[1]).toBe('2022-03-06_165')
    expect(Object.keys(sorted)[4]).toBe('2022-03-20_164')
  })
})
