import { Calendar } from '@/plugins/services/calendar.service'
import { Event } from '@/plugins/lib/calendar/Event'
import { CalendarDate } from '@/plugins/lib/calendar/Date'

export class DayCalendar extends Calendar {
  #eventsArr = []

  /**
   * Returns array of events
   * @param fullDate
   * @return {{[p: string]: *}[]}
   */
  showEvents(fullDate) {
    const startTime = fullDate
    const endTime = new CalendarDate(fullDate.valueOf() + Calendar.DAY)

    // Clear arrays
    this.#clearEvents()

    this.events = this.getEventsByTime(startTime, endTime)
    this.#updateEventsArray(fullDate)

    return this.#eventsArr.map((cur) => ({
      ...cur,
      row: cur.getRowNumberTime(this.config),
    }))
  }

  /**
   * Clears events, that could be saved from previous relation with calendar.
   */
  #clearEvents = () => {
    this.#eventsArr = []
  }

  /**
   * Converts events to event object
   * @return {Event[]}
   */
  #updateEventsArray = (fullDate) => {
    this.#eventsArr = this.events.map((cur) => {
      const event = new Event(cur)

      // Split events that lasts over a day
      if (!event.start.isDateEqual(fullDate)) {
        event.start = new CalendarDate(fullDate.valueOf())
        event.start.setHours(0, 0, 0, 0)
      }
      if (!event.end.isDateEqual(fullDate)) {
        event.end = new CalendarDate(fullDate.valueOf())
        event.end.setHours(24, 0, 0, 0)
      }

      return event
    })
  }
}
