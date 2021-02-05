export class Calendar {
  static WEEK = 604800000
  static DAY = 86400000

  constructor(store, daysInWeek) {
    this.events = []

    // Store getters
    this.getEventsByTime = store.getters['events/getEventsByTime']

    this.config = store.getters['calendar/getConfig']
    this.$daysInWeek = daysInWeek
  }

  /**
   * Checks how many days are there in a month
   * @return {number}
   */
  daysInMonth = (year, month) => 32 - new Date(year, month, 32).getDate()
}
