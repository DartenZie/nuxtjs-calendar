import { Time } from '@/plugins/lib/calendar/Time'
import { CalendarDate } from '@/plugins/lib/calendar/Date'

export class Event {
  constructor(event, daysInWeek) {
    this.$daysInWeek = daysInWeek

    this.id = event.id
    this.name = event.name
    this.start = new CalendarDate(event.start.valueOf())
    this.end = new CalendarDate(event.end.valueOf())
    this.variant = event.variant
    this.allDay = event.allDay
    this.overMonth = event.overMonth
  }

  /**
   * Converts hours and minutes in only minutes
   * @param timeObj
   * @return {*}
   */
  #convertToMinutes = (timeObj) => timeObj.hours * 60 + timeObj.minutes

  /**
   * Returns first day in month
   * @return {number}
   */
  #getFirstDayInMonth = () =>
    new Date(this.start.getFullYear(), this.start.getMonth()).getDay()

  /**
   * Returns DateTime based on Date object and Time object
   * @param time
   * @return {Date}
   */
  #getDateTime = (time) => {
    const newDate = new CalendarDate(this.start.valueOf())
    newDate.setHours(time.hours, time.minutes)

    return newDate
  }

  /**
   * Returns in which time event should be placed
   * @param config
   * @return {string}
   */
  getRowNumberTime(config) {
    // If event is marked as allDay, there is no any actions needed, because
    // value is static
    if (this.allDay) return '2 / span 1'

    const { startTime, endTime, slotDuration } = config

    // Turns start and end time into an object
    const startTimeObj = new Time(startTime)
    const endTimeObj = new Time(endTime)

    // Converts time object to calendar start and end DateTime
    const calendarStartDateTime = this.#getDateTime(startTimeObj)
    const calendarEndDateTime = this.#getDateTime(endTimeObj)

    // Hours of times got converted to minutes
    const calendarStartTime = this.#convertToMinutes(startTimeObj)
    const calendarEndTime = this.#convertToMinutes(endTimeObj)
    let eventStartTime = this.start.getHours() * 60 + this.start.getMinutes()
    let eventEndTime = this.end.getHours() * 60 + this.end.getMinutes()

    if (this.start.valueOf() < calendarStartDateTime.valueOf())
      eventStartTime = calendarStartTime
    if (this.end.valueOf() > calendarEndDateTime.valueOf())
      eventEndTime = calendarEndTime

    // Calculations, where to place event based on Calendar start and end time,
    // calendar slot duration and event start and end time
    const eventStart =
      calendarStartTime >= eventStartTime
        ? 3
        : (eventStartTime - calendarStartTime) / slotDuration + 3
    const eventEnd =
      calendarEndTime >= eventEndTime
        ? (eventEndTime - eventStartTime) / slotDuration
        : (calendarEndTime - eventStartTime) / slotDuration

    return `${eventStart} / span ${eventEnd}`
  }

  /**
   * Returns in which week should event be placed
   */
  getRowNumberMonth() {
    const firstDay = this.#getFirstDayInMonth()
    const offset = this.$daysInWeek.getFirstOffset(firstDay)
    const date = this.start.getDate()
    const row = (date + offset) / 7 + 2

    if ((date + offset) % 7 === 0) return row - 1
    return Math.floor(row)
  }

  /**
   * Returns where exactly in week should event be placed
   * @return {string|number}
   */
  getColNumber() {
    const firstDay = this.$daysInWeek.getFirstDayInWeek(this.start)

    const startCol =
      Math.floor((this.start.valueOf() - firstDay.valueOf()) / 86400000) + 1

    if (this.allDay) {
      const start = this.$daysInWeek.getFirstOffset(this.start.getDay())
      const end = this.$daysInWeek.getFirstOffset(this.end.getDay())
      const cols = end - start + 1

      return `${startCol} / span ${cols}`
    }

    return startCol
  }
}
