import { Calendar } from '@/plugins/services/calendar.service'
import { Event } from '@/plugins/lib/calendar/Event'
import { CalendarDate } from '@/plugins/lib/calendar/Date'

export class MonthCalendar extends Calendar {
  #eventsArr = []
  #occupied = []

  /**
   * Returns array of events
   * @param year
   * @param month
   * @return {{[p: string]: *}[]}
   */
  showEvents(year, month) {
    const firstDay = new CalendarDate(year, month)
    const lastDay = new CalendarDate(
      year,
      month,
      this.daysInMonth(year, month) + 1
    )

    // Clear arrays
    this.#clearEvents()

    // Get events related to time
    this.events = this.getEventsByTime(firstDay, lastDay)
    this.#limitEventToMonth(year, month)
    this.#updateEventsArray()

    return this.#eventsArr.map((cur) => ({
      ...cur,
      row: cur.getRowNumberMonth(),
      col: cur.getColNumber(),
    }))
  }

  /**
   * Clears events, that could be saved from previous relation with calendar.
   */
  #clearEvents = () => {
    this.#eventsArr = []
    this.#occupied = []
  }

  /**
   * If events lasts over month, limits event only to current month
   * @param year
   * @param month
   */
  #limitEventToMonth = (year, month) => {
    this.events.forEach((cur) => {
      const index = this.events.indexOf(cur)
      const event = new Event(cur, this.$daysInWeek)
      const monthDate = new CalendarDate(year, month)

      if (!event.start.isMonthEqual(monthDate)) event.start = monthDate

      if (!event.end.isMonthEqual(monthDate)) {
        if (!event.allDay)
          event.end.setFullYear(year, month, this.daysInMonth(year, month) + 1)
        else event.end.setFullYear(year, month, this.daysInMonth(year, month))

        event.end.setHours(0, 0, 0, 0)
        event.overMonth = true
      }

      this.events[index] = event
    })
  }

  /**
   * Updates events array, if there are some events which lasts over a day,
   * they'll got split. If event is marked as allDay it will split it by weeks.
   */
  #updateEventsArray = () => {
    this.events.forEach((cur) => {
      const event = new Event(cur, this.$daysInWeek)

      if (!event.allDay) {
        while (event.end.getDate() !== event.start.getDate()) {
          const newEvent = new Event(event, this.$daysInWeek)
          newEvent.end = new CalendarDate(event.start.setHours(24, 0, 0, 0))

          this.#addEventInArray(newEvent)
        }

        if (!event.overMonth) this.#addEventInArray(event)
      } else {
        const start = event.start.getDay()
        let offset = this.$daysInWeek.getFirstOffset(start)

        while (event.end.getDate() - event.start.getDate() + offset >= 7) {
          const newEvent = new Event(event, this.$daysInWeek)

          // Set old event start
          event.start.setDate(event.start.getDate() - offset + 7)

          this.#eventsArr.push(newEvent)
          offset = 0
        }

        this.#eventsArr.push(event)
      }
    })
  }

  /**
   * Adds events in array while checking if date is already occupied
   * @param event
   */
  #addEventInArray = (event) => {
    if (!this.#occupied.find((el) => el.date === event.start.getDate())) {
      this.#eventsArr.push(event)
      this.#occupied.push({ date: event.start.getDate(), timesUsed: 1 })
    } else {
      // Gets index of item in events array
      const eventItem = this.#eventsArr.find(
        (el) => el.start.getDate() === event.start.getDate() && !el.allDay
      )
      const eventIndex = this.#eventsArr.indexOf(eventItem)

      // Gets index of item in occupied event
      const occupiedItem = this.#occupied.find(
        (el) => el.date === event.start.getDate()
      )
      const occupiedIndex = this.#occupied.indexOf(occupiedItem)

      // Set new value of how many times has been item used
      const timesUsed = this.#occupied[occupiedIndex].timesUsed + 1

      // Pushes new object instead of olf one
      this.#occupied[occupiedIndex] = {
        date: event.start.getDate(),
        timesUsed,
      }

      const inflictedEvents = timesUsed < 5 ? 'objednávky' : 'objednávek'

      // Replace item in events array
      event.name = `${timesUsed} ${inflictedEvents}`
      event.variant = 'warning'
      this.#eventsArr[eventIndex] = event
    }
  }
}
