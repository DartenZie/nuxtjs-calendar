<template>
  <simplebar class="calendar-wrapper">
    <div class="calendar-group">
      <div class="times">
        <div class="time time-header-blank"></div>
        <div v-for="time in times" :key="time" class="time">
          {{ time }}
        </div>
      </div>
      <div class="calendar">
        <div class="day-header">{{ date }}</div>
        <div
          v-for="index in times.length"
          :key="`Cell - ${index}`"
          class="calendar-cell"
        ></div>
        <section
          v-for="event in events"
          :key="event.id"
          :class="`task--${event.variant}`"
          :style="{ 'grid-row': event.row }"
          class="task"
        >
          <span class="task-name">{{ event.name }}</span>
        </section>
      </div>
    </div>
  </simplebar>
</template>

<script>
import Simplebar from 'simplebar-vue'

import { mapGetters } from 'vuex'
import { getTimes } from '@/plugins/lib/calendar/calendar'
import { formatFullDate } from '@/plugins/lib/dateFormatter'

export default {
  components: { Simplebar },
  computed: {
    ...mapGetters('calendar', ['getConfig', 'getFullDate']),
    times() {
      return getTimes(this.getConfig)
    },
    date() {
      return formatFullDate(this.getFullDate)
    },
    events() {
      return this.$dayCalendar.showEvents(this.getFullDate)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/components/calendar/calendar-day';
</style>
