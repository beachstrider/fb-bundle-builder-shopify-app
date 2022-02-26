import { getShortDate } from '../../../src/utils/dates'
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
})
