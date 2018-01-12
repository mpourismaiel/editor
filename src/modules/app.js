import moment from 'moment'
import { createAction, createReducer } from '../utils/redux-helpers'

export const DATEPICKER_TOGGLE = 'EDITOR/DATEPICKER/TOGGLE'
export const DATEPICKER_DATE_CHANGE = 'EDITOR/DATEPICKER/DATE/CHANGE'
export const DATEPICKER_MONTH_CHANGE = 'EDITOR/DATEPICKER/MONTH/CHANGE'

export const toggleDatepicker = () => createAction(DATEPICKER_TOGGLE)
export const changeDate = date => createAction(DATEPICKER_DATE_CHANGE, date)
export const changeMonth = date => createAction(DATEPICKER_MONTH_CHANGE, date)

export const reducer = createReducer(
  { datepickerOpen: false, activeDate: moment(), activeMonth: moment() },
  {
    [DATEPICKER_TOGGLE]: state => ({
      ...state,
      datepickerOpen: !state.datepickerOpen,
    }),
    [DATEPICKER_DATE_CHANGE]: (state, payload) => ({
      ...state,
      activeDate: payload,
    }),
    [DATEPICKER_MONTH_CHANGE]: (state, payload) => ({
      ...state,
      activeMonth: payload,
    }),
  },
)
