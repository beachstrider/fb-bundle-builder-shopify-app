import uniqueArray from '../../../src/utils/uniqueArray'

it('Return unique array', () => {
  const dates = ['2022-01-17', '2022-01-17', '2021-12-20']
  const newArray = uniqueArray(dates)
  expect(newArray.length).toBe(2)
})
