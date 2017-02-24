const LOAD = 'info/LOAD'

const initialState = {
  stuff: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        stuff: 'test data 2',
      }
    default:
      return state
  }
}

export const load = () => {
  return {
    type: LOAD,
  }
}