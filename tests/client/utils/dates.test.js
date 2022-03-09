import { getShortDate, sortByDateProperty } from '../../../src/utils/dates'
import dayjs from 'dayjs'

describe('Unit test - dates utils', () => {
  jest.mock('dayjs', () => {
    return () => jest.requireActual('dayjs')
  })

  it('test formatted date with short version', () => {
    const date = '2022-02-13T05:00:00.000Z'

    const formattedDate = getShortDate(date)

    expect(formattedDate).toEqual('Feb 13')
  })

  it('test formatted date with short version and show the year', () => {
    const date = '2022-02-13T05:00:00.000Z'

    const formattedDate = getShortDate(new Date(date).toISOString(), {
      withYear: true
    })

    expect(formattedDate).toEqual('Feb 13, 2022')
  })

  it('test formatted date with invalid date format', () => {
    const date = '2022-02-13T05:00:00ABC'

    expect(() => {
      getShortDate(date)
    }).toThrow("date param isn't a correct date format")
  })

  it('test formatted date with invalid date format', () => {
    const items = [
      {
        items: [],
        subId: 253,
        deliveryDay: 3,
        status: 'locked',
        subscriptionDate: '2022-03-13',
        queryDate: '2022-03-06T08:00:00.000Z'
      },
      {
        items: [],
        subId: 254,
        deliveryDay: 3,
        status: 'locked',
        subscriptionDate: '2022-03-06',
        queryDate: '2022-03-06T08:00:00.000Z'
      },
      {
        items: [],
        subId: 255,
        deliveryDay: 3,
        status: 'locked',
        subscriptionDate: '2022-03-05',
        queryDate: '2022-03-06T08:00:00.000Z'
      }
    ]

    const sorted = sortByDateProperty(items, 'subscriptionDate')
    expect(sorted[0].subscriptionDate).toBe('2022-03-05')
    expect(sorted[1].subscriptionDate).toBe('2022-03-06')
    expect(sorted[2].subscriptionDate).toBe('2022-03-13')
  })
})
