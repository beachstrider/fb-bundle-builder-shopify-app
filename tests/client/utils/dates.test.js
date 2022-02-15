import { getShortDate } from '../../../src/utils/dates'

describe('Unit test - dates utils', () => {
  it('test date formmated with short version', () => {
    const date = '2022-02-13T05:00:00.000Z'

    const formattedDate = getShortDate(new Date(date))

    expect(formattedDate).toEqual('Feb 13')
  })

  it('test date formmated with short version and show the year', () => {
    const date = '2022-02-13T05:00:00.000Z'

    const formattedDate = getShortDate(new Date(date), { withYear: true })

    expect(formattedDate).toEqual('Feb 13, 2022')
  })

  it('test date formmated with invalid date format', () => {
    const date = '2022-02-13T05:00:00.000Z'

    expect(() => {
      getShortDate(date)
    }).toThrow("date param isn't a correct date format")
  })
})
