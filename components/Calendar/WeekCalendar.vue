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
        <div v-for="day in days" :key="day.day" class="day">
          <div class="day-header">{{ day.day }} - {{ day.date }}.</div>
        </div>
        <div
          v-for="index in times.length * 7"
          :key="`Cell - ${index}`"
          class="calendar-cell"
        ></div>
        <section
          v-for="(event, index) in events"
          :key="index"
          :class="`task--${event.variant}`"
          :style="{ 'grid-row': event.row, 'grid-column': event.col }"
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

export default {
  components: { Simplebar },
  computed: {
    ...mapGetters('calendar', ['getConfig', 'getFullDate']),
    days() {
      return this.$daysInWeek.getWeekDays(this.getFullDate)
    },
    times() {
      return getTimes(this.getConfig)
    },
    events() {
      return this.$weekCalendar.showEvents(this.getFullDate)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/components/calendar/calendar-week';
</style>
