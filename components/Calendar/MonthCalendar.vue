<template>
  <div class="calendar">
    <span v-for="day in daysInWeek" :key="day">{{ day }}</span>
    <div
      v-for="day in days"
      :key="`Cell - ${day.id}`"
      :class="{ 'day--disabled': day.disabled, current: day.active }"
      class="day"
    >
      {{ day.date }}
    </div>
    <section
      v-for="(event, index) in events"
      :key="index"
      :class="`task--${event.variant}`"
      :style="{
        'grid-row': event.row,
        'grid-column': event.col,
        'align-self': event.allDay ? 'center' : 'end',
        'margin-top': event.allDay ? '-5px' : '0',
      }"
      class="task"
    >
      <span class="task-name">{{ event.name }}</span>
    </section>
    <!--    <section class="task task&#45;&#45;primary">-->
    <!--      Product Checkup 1-->
    <!--      <div class="task__detail">-->
    <!--        <h2>Product Checkup 1</h2>-->
    <!--        <p>13. - 15. Ledna</p>-->
    <!--      </div>-->
    <!--    </section>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMonthDays } from '@/plugins/lib/calendar/calendar'

export default {
  computed: {
    ...mapGetters('calendar', [
      'getConfig',
      'getYear',
      'getMonth',
      'getFullDate',
    ]),
    daysInWeek() {
      return this.$daysInWeek.getDaysInWeek()
    },
    days() {
      return getMonthDays(this.getMonth, this.getYear, this.getConfig)
    },
    events() {
      return this.$monthCalendar.showEvents(this.getYear, this.getMonth)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/components/calendar/calendar-month';
</style>
