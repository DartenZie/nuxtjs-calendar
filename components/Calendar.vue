<template>
  <div class="calendar-container">
    <div class="calendar-header d-flex justify-content-between">
      <div class="d-flex">
        <b-button class="btn-icon" @click="handlePrev(calendarType)">
          <img :src="angleLeftIcon" alt="Left" />
        </b-button>
        <b-button class="btn-icon" @click="handleNext(calendarType)">
          <img :src="angleRightIcon" alt="Right" />
        </b-button>
      </div>
      <div class="d-flex">
        <h1>{{ formattedMonth }}</h1>
        <p class="ml-2">{{ getYear }}</p>
      </div>
      <div class="d-flex">
        <b-button
          class="calendar-btn"
          :class="{ active: month }"
          @click="changeToMonth"
          >Měsíc</b-button
        >
        <b-button
          class="calendar-btn"
          :class="{ active: week }"
          @click="changeToWeek"
          >Týden</b-button
        >
        <b-button
          class="calendar-btn"
          :class="{ active: day }"
          @click="changeToDay"
          >Den</b-button
        >
      </div>
    </div>

    <month-calendar v-if="validDate && month" />
    <week-calendar v-else-if="validDate && week" />
    <day-calendar v-else-if="validDate && day" />
  </div>
</template>

<script>
import MonthCalendar from '@/components/Calendar/MonthCalendar'
import WeekCalendar from '@/components/Calendar/WeekCalendar'
import DayCalendar from '@/components/Calendar/DayCalendar'

import { mapActions, mapGetters } from 'vuex'
import { formatMonth } from '@/plugins/lib/dateFormatter'

import angleLeftIcon from 'assets/icons/angle-left.svg?raw'
import angleRightIcon from 'assets/icons/angle-right.svg?raw'

export default {
  components: { MonthCalendar, WeekCalendar, DayCalendar },
  data: () => ({
    calendarType: '',
    angleLeftIcon,
    angleRightIcon,
  }),
  computed: {
    ...mapGetters('calendar', ['getConfig', 'getYear', 'getMonth', 'getDate']),
    formattedMonth() {
      return formatMonth(this.getMonth)
    },
    validDate() {
      return (
        Number.isInteger(this.getYear) &&
        Number.isInteger(this.getMonth) &&
        Number.isInteger(this.getDate)
      )
    },
    month() {
      return this.calendarType === 'month'
    },
    week() {
      return this.calendarType === 'week'
    },
    day() {
      return this.calendarType === 'day'
    },
  },
  mounted() {
    this.calendarType = this.getConfig.defaultCalendarType
    this.setCurrentDateIfNotDefined()
  },
  methods: {
    ...mapActions('calendar', [
      'setCurrentDateIfNotDefined',
      'handlePrev',
      'handleNext',
    ]),
    changeToMonth() {
      this.calendarType = 'month'
    },
    changeToWeek() {
      this.calendarType = 'week'
    },
    changeToDay() {
      this.calendarType = 'day'
    },
  },
}
</script>
