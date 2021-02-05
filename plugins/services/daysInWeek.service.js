import { CalendarDate } from '@/plugins/lib/calendar/Date'

export class DaysInWeek {
  #daysInWeek = new Map()

  constructor(config) {
    this.config = config

    // Days in week
    this.#daysInWeek.set('sun', { full: 'Neděle', short: 'Ne', id: 0 })
    this.#daysInWeek.set('mon', { full: 'Pondělí', short: 'Po', id: 1 })
    this.#daysInWeek.set('tue', { full: 'Úterý', short: 'Út', id: 2 })
    this.#daysInWeek.set('wed', { full: 'Středa', short: 'St', id: 3 })
    this.#daysInWeek.set('thu', { full: 'Čtvrtek', short: 'Čt', id: 4 })
    this.#daysInWeek.set('fri', { full: 'Pátek', short: 'Pá', id: 5 })
    this.#daysInWeek.set('sat', { full: 'Sobota', short: 'So', id: 6 })
  }

  /**
   * Returns days in week in right order determined by config
   * @return {*[]}
   */
  #orderDaysInWeek = () => {
    const { startDay } = this.config

    const daysInWeekArr = []
    const daysInWeekArrFrom = []

    let passedStartDay = false

    this.#daysInWeek.forEach((value, key) => {
      if (key === startDay) passedStartDay = true

      if (passedStartDay) daysInWeekArrFrom.push(value)
      else daysInWeekArr.push(value)
    })

    return [...daysInWeekArrFrom, ...daysInWeekArr]
  }

  /**
   * Returns days in week with right dayType
   * @return {*[]}
   */
  getDaysInWeek() {
    const { dayType } = this.config
    return this.#orderDaysInWeek().map((cur) => cur[dayType])
  }

  /**
   * Returns days in week with ids
   * @return {*[]}
   */
  getDaysInWeekId() {
    return this.#orderDaysInWeek().map((cur) => cur.id)
  }

  /**
   * Returns offset in week
   * @param firstDay
   * @return {number}
   */
  getFirstOffset(firstDay) {
    const daysInWeekArr = this.getDaysInWeekId()
    return daysInWeekArr.indexOf(firstDay)
  }

  /**
   * Returns date of first day in week
   * @param date
   * @return {*}
   */
  getFirstDayInWeek(date) {
    const day = date.getDay()
    const offset = this.getDaysInWeekId().indexOf(day)
    const newDate = new CalendarDate(date.valueOf())
    newDate.setDate(newDate.getDate() - offset)

    return newDate
  }

  /**
   * Returns array of week days objects
   * @param date
   * @return {[]}
   */
  getWeekDays(date) {
    const daysInWeekShort = this.getDaysInWeek()
    const firstDate = this.getFirstDayInWeek(date)
    const days = []

    for (let i = 0; i < 7; i++) {
      days.push({ day: daysInWeekShort[i], date: firstDate.getDate() })

      // Set next date
      firstDate.setDate(firstDate.getDate() + 1)
    }

    return days
  }
}
