import { createAction, createReducer } from '../utils/redux-helpers'

export const ADD_ENTRY = 'EDITOR/EDITOR/ENTRY/ADD'
export const UPDATE_CONTENT = 'EDITOR/EDITOR/CONTENT/UPDATE'

export const addEntry = (title, date) =>
  createAction(ADD_ENTRY, { title, date })
export const updateContent = (content, date) =>
  createAction(UPDATE_CONTENT, { content, date })

export const reducer = createReducer(
  { date: {} },
  {
    [ADD_ENTRY]: (state, payload) => ({
      ...state,
      date: {
        ...state.date,
        [payload.date]: { ...state.date[payload.date], title: payload.title },
      },
    }),
    [UPDATE_CONTENT]: (state, payload) => ({
      ...state,
      date: {
        ...state.date,
        [payload.date]: { ...state.date[payload.date], text: payload.content },
      },
    }),
  },
)
