import { createAction, createReducer } from '../utils/redux-helpers'

const APP_INIT = 'EDITOR/APP/INIT'

export const init = () => createAction(APP_INIT)

export const reducer = createReducer(
  { initialized: false },
  {
    [APP_INIT]: state => ({ ...state, initialized: true }),
  },
)
