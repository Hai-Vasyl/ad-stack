import { SET_TEXT_SEARCH } from "./searchTypes"

export const setText = (text) => {
  return {
    type: SET_TEXT_SEARCH,
    payload: text,
  }
}
