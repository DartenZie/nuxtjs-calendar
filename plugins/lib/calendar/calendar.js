import { formatTimeDigitalFromObject } from '@/plugins/lib/dateFormatter'

const daysInWeek = new Map()

daysInWeek.set(0, 'sun')
daysInWeek.set(1, 'mon')
daysInWeek.set(2, 'tue')
daysInWeek.set(3, 'wed')
daysInWeek.set(4, 'thu')
daysInWeek.set(5, 'fri')
daysInWeek.set(6, 'sat')

// Returns week days array based on start day
const getDaysInWeekArr = (startDay) => {
  const daysInWeekArr = []
  const daysInWeekArrFrom = []

  let passedStartDay = false

  daysInWeek.forEach((value) => {
    if (value === startDay) passedStartDay = true

    if (passedStartDay) daysInWeekArrFrom.push(value)
    else daysInWeekArr.push(value)
  })

  return [...daysInWeekArrFrom, ...daysInWeekArr]
}

// Returns how many first cells should be empty
export const getFirstOffset = (firstDay, startDay) => {
  const daysInWeekArr = getDaysInWeekArr(startDay)
  return daysInWeekArr.indexOf(daysInWeek.get(firstDay))
}

// Checks how many days are there in a month
export const daysInMonth = (month, year) =>
  32 - new Date(year, month, 32).getDate()

// Returns date of first day in week
export const getFirstDayInWeek = (date, startDay) => {
  const dayInWeek = date.getDay()
  const offset = getDaysInWeekArr(startDay).indexOf(daysInWeek.get(dayInWeek))
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset)
}

// Converts time string into time object
export const getTimeObject = (time) => {
  const hours = parseInt(time.split(':')[0])
  const minutes = parseInt(time.split(':')[1])
  const seconds = parseInt(time.split(':')[2])

  return { hours, minutes, seconds }
}

// Returns array of month days
export const getMonthDays = (month, year, { startDay }) => {
  // First day in week of the month
  const firstDay = new Date(year, month).getDay()

  // How many empty cells before first day
  const firstOffset = getFirstOffset(firstDay, startDay)
  const monthDays = daysInMonth(month, year)

  // How many cells needed in total
  // When cells % 7 equals 0, it means, that there are enough cells to fill in the row
  let cells = firstOffset + monthDays
  while (cells % 7 !== 0) cells++

  const calendar = []

  // Loop creates array of dates in month
  for (let i = 0; i < cells; i++) {
    const date = new Date(year, month, i - firstOffset + 1).getDate()
    const currentDate = new Date()

    // Else-if block determines which cells are disabled and which date is active
    if (i < firstOffset) {
      calendar.push({ id: i, date, disabled: true })
    } else if (i >= monthDays + firstOffset) {
      calendar.push({ id: i, date, disabled: true })
    } else if (
      currentDate.getDate() === i - firstOffset + 1 &&
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === year
    ) {
      calendar.push({ id: i, date, active: true })
    } else {
      calendar.push({ id: i, date })
    }
  }

  return calendar
}

// Returns array of week days
export const getWeekDays = (date, { startDay }) => {
  const daysInWeekShort = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'] // getDaysInWeek({ startDay, dayType })
  let firstDate = getFirstDayInWeek(date, startDay)
  const days = []

  for (let i = 0; i < 7; i++) {
    days.push({ day: daysInWeekShort[i], date: firstDate.getDate() })

    // Returns next date
    firstDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate() + 1
    )
  }

  return days
}

// Returns an array of times due to start time, end time and slot duration
export const getTimes = ({ startTime, endTime, slotDuration }) => {
  // Convert from string to object
  const start = getTimeObject(startTime)
  const end = getTimeObject(endTime)

  let condition = true
  const times = []

  while (condition) {
    // Checks if loop is not over time
    if (start.hours < end.hours || start.minutes < end.minutes) {
      condition = true
    } else condition = start.hours === end.hours && start.minutes < end.minutes

    // Push current time into the times array
    times.push(formatTimeDigitalFromObject(start, 'minutes'))

    // Update time for next loop
    if (start.minutes + slotDuration >= 60) {
      start.hours += 1
      start.minutes = 0
    } else start.minutes += slotDuration
  }

  return times
}
