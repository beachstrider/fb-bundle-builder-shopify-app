const replaceString = require('../../src/server/utils/replaceString')

it('replaces multiple strings', () => {
  const mainString = 'This is a test to replace CODE ID'
  const newString = replaceString(mainString, [
    {
      search: 'CODE',
      replacement: '007'
    },
    {
      search: 'ID',
      replacement: '123'
    }
  ])

  expect(newString).toBe('This is a test to replace 007 123')
})
