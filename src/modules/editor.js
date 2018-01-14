import moment from 'moment'
import { createAction, createReducer } from 'redux-utility-belt'
import { REHYDRATE } from 'redux-persist'

export const ADD_ENTRY = 'EDITOR/EDITOR/ENTRY/ADD'
export const UPDATE_CONTENT = 'EDITOR/EDITOR/CONTENT/UPDATE'

export const addEntry = (title, date) =>
  createAction(ADD_ENTRY, { title, date })
export const updateContent = (content, date) =>
  createAction(UPDATE_CONTENT, { content, date })

const format = date => moment(date).format('YYYY-MM-DD')

export const reducer = createReducer(
  { date: {} },
  {
    [REHYDRATE]: (state, payload) => {
      if (payload && payload.editor) {
        return { ...state, date: payload.editor.date }
      }

      return state
    },
    [ADD_ENTRY]: (state, payload) => {
      if (state.date[format(payload.date)]) {
        return state
      }

      const newState = { ...state }

      newState.date[format(payload.date)] = { title: payload.title, text: '' }
      return newState
    },
    [UPDATE_CONTENT]: (state, payload) => {
      if (!state.date[format(payload.date)]) {
        return state
      }

      const newState = { ...state }

      newState.date[format(payload.date)].text = payload.content
      return newState
    },
  },
)
