const LOAD = 'info/LOAD'

const initialState = {
  stuff: '',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        stuff: 'test data2',
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