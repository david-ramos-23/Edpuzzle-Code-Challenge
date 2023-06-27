/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export function convertISO8601ToDate(duration: string): string {
  const timeExtractor = /^P([0-9]*D)?T([0-9]*H)?([0-9]*M)?([0-9]*S)?$/i
  const extracted = timeExtractor.exec(duration)

  if (extracted != null) {
    const hours = parseInt(extracted[2], 10) || 0
    const minutes = parseInt(extracted[3], 10) || 0
    const seconds = parseInt(extracted[4], 10) || 0

    const duration = hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000
    const dateHours = `0${new Date(duration).getHours() - 1}`.slice(-2)
    const dateMinutes = `0${new Date(duration).getMinutes()}`.slice(-2)
    const dateSeconds = `0${new Date(duration).getSeconds()}`.slice(-2)

    return dateHours === '00'
      ? `${dateMinutes}:${dateSeconds}`
      : `${dateHours}:${dateMinutes}:${dateSeconds}`
  }
  return ''
}

export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes}:${remainingSeconds}`
  } else if (!hours && minutes > 0) {
    return `${minutes}:${remainingSeconds}`
  }

  return `00:${remainingSeconds}`
}

export function timeAgo(input: Date | string) {
  const date = input instanceof Date ? input : new Date(input)
  const formatter = new Intl.RelativeTimeFormat('en')
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }
  const secondsElapsed = (date.getTime() - Date.now()) / 1000
  for (const key in ranges) {
    if (ranges[key as keyof typeof ranges] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as keyof typeof ranges]
      return formatter.format(Math.round(delta), key as keyof typeof ranges)
    }
  }
  return undefined
}
