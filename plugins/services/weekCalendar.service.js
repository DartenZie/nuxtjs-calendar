import { Calendar } from '@/plugins/services/calendar.service'
import { Event } from '@/plugins/lib/calendar/Event'
import { CalendarDate } from '@/plugins/lib/calendar/Date'

export class WeekCalendar extends Calendar {
  #eventsArr = []

  /**
   * Returns array of events
   * @param fullDate
   * @return {{[p: string]: *}[]}
   */
  showEvents(fullDate) {
    const firstDay = this.$daysInWeek.getFirstDayInWeek(fullDate)
    const lastDay = new CalendarDate(firstDay.valueOf() + Calendar.WEEK)

    // Clear arrays
    this.#clearEvents()

    // Get events related to time
    this.events = this.getEventsByTime(firstDay, lastDay)
    this.#limitToWeek(fullDate)
    this.#updateEventsArray()

    return this.#eventsArr.map((cur) => ({
      ...cur,
      row: cur.getRowNumberTime(this.config),
      col: cur.getColNumber(),
    }))
  }

  /**
   * Clears events, that could be saved from previous relation with calendar.
   */
  #clearEvents = () => {
    this.#eventsArr = []
  }

  #limitToWeek = (fullDate) => {
    this.events.forEach((cur) => {
      const index = this.events.indexOf(cur)
      const event = new Event(cur, this.$daysInWeek)

      const firstDay = this.$daysInWeek.getFirstDayInWeek(fullDate)
      const lastDay = new CalendarDate(firstDay.valueOf() + Calendar.WEEK)

      if (event.start.valueOf() < firstDay.valueOf()) event.start = firstDay
      if (event.end.valueOf() > lastDay.valueOf()) event.end = lastDay

      this.events[index] = event
    })
  }

  /**
   * Updates events array, if there are some events which lasts over a day,
   * they'll got split. If events is marked as allDay and lasts over the week,
   * it'll got reduced end or start.
   */
  #updateEventsArray = () => {
    this.events.forEach((cur) => {
      const event = new Event(cur, this.$daysInWeek)

      if (!event.allDay) {
        // If dates not equals return true because wee need to split it
        let dateCondition = !event.start.isDateEqual(event.end)
        // If value of end date is greater than value of start day, return false
        // just in case
        let isBeforeCondition = event.start.valueOf() < event.end.valueOf()

        while (dateCondition && isBeforeCondition) {
          const newEvent = new Event(event, this.$daysInWeek)
          newEvent.end = new CalendarDate(event.start.setHours(24, 0, 0, 0))

          this.#eventsArr.push(newEvent)

          // Update conditions
          dateCondition = !event.start.isDateEqual(event.end)
          isBeforeCondition = event.start.valueOf() < event.end.valueOf()
        }

        this.#eventsArr.push(event)
      } else {
        this.#eventsArr.push(event)
      }
    })
  }
}
