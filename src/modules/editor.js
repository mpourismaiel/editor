import { createAction, createReducer } from 'redux-utility-belt'

export const ADD_ENTRY = 'EDITOR/EDITOR/ENTRY/ADD'
export const UPDATE_CONTENT = 'EDITOR/EDITOR/CONTENT/UPDATE'

export const addEntry = (title, date) =>
  createAction(ADD_ENTRY, { title, date })
export const updateContent = (content, date) =>
  createAction(UPDATE_CONTENT, { content, date })

const format = date => date.format('YYYY-MM-DD')

export const reducer = createReducer(
  { date: {} },
  {
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
