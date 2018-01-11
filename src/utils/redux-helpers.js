/**
 * Reducer creator function.
 * @param {*} initialState Initial state of the reducer
 * @param {object} config A dictionary of functions showing how each action is handled
 */
export const createReducer = (initialState, config) => {
  return (state = initialState, action) => {
    if (config[action.type]) {
      return config[action.type](state, action.payload, action.meta)
    }

    return state
  }
}

/**
 * Creates an standardized action
 * @param {string} actionType Type of the action
 * @param {*} payload Payload of the action
 * @param {*} meta Any extra info that is not used in the state manipulation directly
 */
export const createAction = (actionType, payload, meta) => ({
  type: actionType,
  payload,
  meta,
})
