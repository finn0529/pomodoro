import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    workSound: 'alarm.mp3',
    BreakSound: 'alarm.mp3',
    items: [],
    current: '',
    finished: [],
    timeleft: time,
    break: false,
    completed: []
  },
  mutations: {
    selectWorkSound (state, data) {
      state.workSound = data
    },
    selectBreakSound (state, data) {
      state.BreakSound = data
    },
    additem (state, data) {
      state.items.push({
        name: data,
        edit: false,
        model: data
      })
    },
    start (state) {
      state.current = state.break ? '休息一下' : state.items.shift().name
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.break) {
        state.finished.push(state.current)
      }
      state.current = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      state.timeleft = state.break ? timeBreak : time
    }
  },
  actions: {
  },
  modules: {
  }
})
