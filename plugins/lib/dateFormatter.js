const months = [
  'Leden',
  'Únor',
  'Březen',
  'Duben',
  'Květen',
  'Červen',
  'Červenec',
  'Srpen',
  'Září',
  'Říjen',
  'Listopad',
  'Prosinec',
]

const inflectedMonths = [
  'ledna',
  'února',
  'březena',
  'dubena',
  'květena',
  'červena',
  'červenece',
  'srpna',
  'září',
  'říjenu',
  'listopadu',
  'prosince',
]

const addZeroInTimeIfNeeded = (time) => `${time < 10 ? `0${time}` : time}`

export const formatMonth = (month) => months[month]

export const formatTimeDigital = (dateTime, type) => {
  const str = []

  str.push(`${addZeroInTimeIfNeeded(dateTime.getHours())}`)
  if (type === 'hours') return str

  str.push(`${addZeroInTimeIfNeeded(dateTime.getMinutes())}`)
  if (type === 'minutes') return str.join(':')

  str.push(`${addZeroInTimeIfNeeded(dateTime.getSeconds())}`)
  if (type === 'seconds') return str.join(':')

  str.push(`${addZeroInTimeIfNeeded(dateTime.getMilliseconds())}`)
  return str.join(':')
}

export const formatTimeDigitalFromObject = (time, type) => {
  const str = []

  str.push(`${addZeroInTimeIfNeeded(time.hours)}`)
  if (type === 'hours') return str

  str.push(`${addZeroInTimeIfNeeded(time.minutes)}`)
  if (type === 'minutes') return str.join(':')

  str.push(`${addZeroInTimeIfNeeded(time.seconds)}`)
  return str.join(':')
}

export const formatFullDate = (date) =>
  `${date.getDate()}. ${inflectedMonths[date.getMonth()]} ${date.getFullYear()}`
