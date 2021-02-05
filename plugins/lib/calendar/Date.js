export class CalendarDate extends Date {
  isDateEqual(date) {
    const sameYear = this.getFullYear() === date.getFullYear()
    const sameMonth = this.getMonth() === date.getMonth()
    const sameDate = this.getDate() === date.getDate()

    return sameYear && sameMonth && sameDate
  }

  isMonthEqual(date) {
    const sameYear = this.getFullYear() === date.getFullYear()
    const sameMonth = this.getMonth() === date.getMonth()

    return sameYear && sameMonth
  }
}
