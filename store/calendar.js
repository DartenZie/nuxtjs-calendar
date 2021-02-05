// reusable aliases for mutations
export const CALENDAR_MUTATIONS = {
  SET_YEAR: 'SET_YEAR',
  SET_MONTH: 'SET_MONTH',
  SET_DATE: 'SET_DATE',

  // Config
  SET_START_DAY: 'SET_START_DAY',
  SET_DAY_TYPE: 'SET_DAY_TYPE',
  SET_START_TIME: 'SET_START_DAY',
  SET_END_TIME: 'SET_END_DAY',
  SET_SLOT_DURATION: 'SET_SLOT_DURATION',
  SET_DEFAULT_CALENDAR_TYPE: 'SET_DEFAULT_CALENDAR_TYPE',
}

export const state = () => ({
  config: {
    startDay: 'mon',
    dayType: 'short',
    startTime: '08:00:00',
    endTime: '16:00:00',
    slotDuration: 30,
    defaultCalendarType: 'month',
  },
  month: undefined,
  year: undefined,
  date: undefined,
})

export const mutations = {
  // store the start day in the state
  [CALENDAR_MUTATIONS.SET_START_DAY](state, startDay) {
    state.config.startDay = startDay
  },

  // store the start day in the state
  [CALENDAR_MUTATIONS.SET_DAY_TYPE](state, dayType) {
    state.config.dayType = dayType
  },

  // store the start time in the state
  [CALENDAR_MUTATIONS.SET_START_TIME](state, startTime) {
    state.config.startTime = startTime
  },

  // store the end time in the state
  [CALENDAR_MUTATIONS.SET_END_TIME](state, endTime) {
    state.config.endTime = endTime
  },

  // store the slot duration in the state
  [CALENDAR_MUTATIONS.SET_SLOT_DURATION](state, slotDuration) {
    state.config.slotDuration = slotDuration
  },

  // store the default calendar type in the state
  [CALENDAR_MUTATIONS.SET_DEFAULT_CALENDAR_TYPE](state, defaultCalendarType) {
    state.config.defaultCalendarType = defaultCalendarType
  },

  // store selected year in the state
  [CALENDAR_MUTATIONS.SET_YEAR](state, year) {
    state.year = year
  },

  // store selected month in the state
  [CALENDAR_MUTATIONS.SET_MONTH](state, month) {
    state.month = month
  },

  // store selected month in the state
  [CALENDAR_MUTATIONS.SET_DATE](state, date) {
    state.date = date
  },
}

export const actions = {
  setConfig({ commit }, config) {
    // Series of commits to set all config values
    commit(CALENDAR_MUTATIONS.SET_START_DAY, config.startDay)
    commit(CALENDAR_MUTATIONS.SET_DAY_TYPE, config.dayType)
    commit(CALENDAR_MUTATIONS.SET_START_TIME, config.startTime)
    commit(CALENDAR_MUTATIONS.SET_END_TIME, config.endTime)
    commit(CALENDAR_MUTATIONS.SET_SLOT_DURATION, config.slotDuration)
    commit(
      CALENDAR_MUTATIONS.SET_DEFAULT_CALENDAR_TYPE,
      config.defaultCalendarType
    )
  },
  setCurrentDateIfNotDefined({ commit, state }) {
    const date = new Date()

    if (!state.year) commit(CALENDAR_MUTATIONS.SET_YEAR, date.getFullYear())
    if (!state.month) commit(CALENDAR_MUTATIONS.SET_MONTH, date.getMonth())
    if (!state.date) commit(CALENDAR_MUTATIONS.SET_DATE, date.getDate())
  },
  handlePrev({ commit, state }, calendarType) {
    let date

    // Returns previous month
    // If you have month -1, date object automatically change: year - 1 and month = 11
    if (calendarType === 'month') date = new Date(state.year, state.month - 1)
    // Returns next week
    else if (calendarType === 'week')
      date = new Date(state.year, state.month, state.date - 7)
    // Returns next day
    else if (calendarType === 'day')
      date = new Date(state.year, state.month, state.date - 1)

    commit(CALENDAR_MUTATIONS.SET_YEAR, date.getFullYear())
    commit(CALENDAR_MUTATIONS.SET_MONTH, date.getMonth())
    commit(CALENDAR_MUTATIONS.SET_DATE, date.getDate())
  },
  handleNext({ commit, state }, calendarType) {
    let date

    // Returns next month
    // If you have month 12, date object automatically change: year + 1 and month = 0
    if (calendarType === 'month') date = new Date(state.year, state.month + 1)
    // Returns next week
    else if (calendarType === 'week')
      date = new Date(state.year, state.month, state.date + 7)
    // Returns next day
    else if (calendarType === 'day')
      date = new Date(state.year, state.month, state.date + 1)

    commit(CALENDAR_MUTATIONS.SET_YEAR, date.getFullYear())
    commit(CALENDAR_MUTATIONS.SET_MONTH, date.getMonth())
    commit(CALENDAR_MUTATIONS.SET_DATE, date.getDate())
  },
}

export const getters = {
  getConfig: (state) => state.config,
  getYear: (state) => state.year,
  getMonth: (state) => state.month,
  getDate: (state) => state.date,
  getFullDate: (state) => new Date(state.year, state.month, state.date),
}
