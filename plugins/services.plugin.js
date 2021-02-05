import { DaysInWeek } from '@/plugins/services/daysInWeek.service'
import { MonthCalendar } from '@/plugins/services/monthCalendar.service'
import { WeekCalendar } from '@/plugins/services/weekCalendar.service'
import { DayCalendar } from '@/plugins/services/dayCalendar.service'

export default ({ store }, inject) => {
  // Create instances of services
  const daysInWeek = new DaysInWeek(store.getters['calendar/getConfig'])
  const monthCalendar = new MonthCalendar(store, daysInWeek)
  const weekCalendar = new WeekCalendar(store, daysInWeek)
  const dayCalendar = new DayCalendar(store, daysInWeek)

  // Inject the services, making it available in the context, component, store, etc.
  inject('monthCalendar', monthCalendar)
  inject('weekCalendar', weekCalendar)
  inject('dayCalendar', dayCalendar)
  inject('daysInWeek', daysInWeek)
}
