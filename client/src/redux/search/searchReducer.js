import { SET_TEXT_SEARCH } from "./searchTypes"

const initialState = {
  text: "",
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_SEARCH:
      return {
        text: action.payload,
      }
    default:
      return state
  }
}

export default searchReducer
