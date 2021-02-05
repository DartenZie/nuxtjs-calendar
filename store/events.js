// Reusable aliases for mutations
const EVENT_MUTATIONS = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  REMOVE_EVENT: 'REMOVE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
}

export const state = () => ({
  events: [
    {
      id: 0,
      name: 'Turbo testovací služba',
      start: new Date(2021, 1, 6, 14),
      end: new Date(2021, 1, 7, 9, 30),
      variant: 'danger',
    },
    {
      id: 1,
      name: 'Testovací služba',
      start: new Date(2021, 1, 7, 13),
      end: new Date(2021, 1, 7, 14),
      variant: 'primary',
    },
    {
      id: 2,
      name: 'Dovolená',
      start: new Date(2021, 1, 1),
      end: new Date(2021, 1, 4),
      allDay: true,
      variant: 'info',
    },
    {
      id: 3,
      name: 'Testovací služba',
      start: new Date(2021, 1, 5, 10, 30),
      end: new Date(2021, 1, 5, 11),
      variant: 'primary',
    },
    {
      id: 4,
      name: 'Testovací služba',
      start: new Date(2021, 1, 11, 15, 30),
      end: new Date(2021, 1, 11, 16),
      variant: 'primary',
    },
    {
      id: 5,
      name: 'Testovací služba',
      start: new Date(2021, 1, 11, 13, 30),
      end: new Date(2021, 1, 11, 15),
      variant: 'primary',
    },
    {
      id: 6,
      name: 'Testovací služba',
      start: new Date(2021, 1, 8, 9, 30),
      end: new Date(2021, 1, 8, 11),
      variant: 'primary',
    },
    {
      id: 7,
      name: 'Testovací služba',
      start: new Date(2021, 1, 8, 11),
      end: new Date(2021, 1, 8, 11, 30),
      variant: 'primary',
    },
    {
      id: 8,
      name: 'Testovací služba',
      start: new Date(2021, 1, 7, 15),
      end: new Date(2021, 1, 7, 15, 30),
      variant: 'primary',
    },
    {
      id: 9,
      name: 'Testovací služba',
      start: new Date(2021, 1, 20, 9, 30),
      end: new Date(2021, 1, 20, 10),
      variant: 'primary',
    },
    {
      id: 10,
      name: 'Testovací služba',
      start: new Date(2021, 1, 23, 8, 30),
      end: new Date(2021, 1, 23, 9, 30),
      variant: 'primary',
    },
    {
      id: 11,
      name: 'Testovací služba',
      start: new Date(2021, 1, 17, 8, 30),
      end: new Date(2021, 1, 17, 9, 30),
      variant: 'primary',
    },
  ],
})

export const mutations = {
  // store events in the state
  [EVENT_MUTATIONS.SET_EVENTS](state, events) {
    state.events = events
  },

  // add event in the state
  [EVENT_MUTATIONS.ADD_EVENT](state, event) {
    state.events.push(event)
  },

  // remove event from state
  [EVENT_MUTATIONS.REMOVE_EVENT](state, eventId) {
    state.events = state.events.filter((el) => el.id !== eventId)
  },
}

export const actions = {
  updateEvent({ commit }, event) {
    commit(EVENT_MUTATIONS.REMOVE_EVENT, event.id)
    commit(EVENT_MUTATIONS.ADD_EVENT, event)
  },
}

export const getters = {
  getEventsByTime: (state) => (from, to) =>
    state.events.filter(
      (el) =>
        (el.end.valueOf() > from.valueOf() &&
          el.start.valueOf() < to.valueOf()) ||
        (el.end.valueOf() >= from.valueOf() &&
          el.start.valueOf() < to.valueOf() &&
          el.allDay)
    ),
}
