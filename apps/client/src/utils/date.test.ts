import { convertISO8601ToDate, timeAgo } from './date'

test.each([
  { youtubeDuration: 'PT30S', expected: '00:30' },
  { youtubeDuration: 'PT5M', expected: '05:00' },
  { youtubeDuration: 'PT2H', expected: '02:00:00' },
  { youtubeDuration: 'PtwoDTthreeHfourMfiveS', expected: '' },
  { youtubeDuration: ' P@#$%^&*()_-+=[]{}|;:,.<>?/`~', expected: '' },
])('should convert $youtubeDuration', ({ youtubeDuration, expected }) => {
  expect(convertISO8601ToDate(youtubeDuration)).toBe(expected)
})

it('should return a string when passing a valid date string', () => {
  expect(timeAgo('2022-01-01')).toBeDefined()
})

it('should return undefined when passing an invalid date string', () => {
  expect(timeAgo('invalid date string')).not.toBeDefined()
})

it('should return a string with in prefix when passing a date in the future', () => {
  const futureDate = new Date(Date.now() + 3600 * 24 * 1000)
  expect(timeAgo(futureDate)).toMatch(/^in/)
})

it('should return a string with ago suffix when passing a date in the past ', () => {
  const pastDate = new Date(Date.now() - 3600 * 24 * 1000)
  expect(timeAgo(pastDate)).toMatch(/ago$/)
})
