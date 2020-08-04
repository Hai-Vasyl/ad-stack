import {
  TOGGLE_DROPMENU_NAVBAR,
  TOGGLE_AUTH_FORM_NAVBAR,
  RESET_NAVBAR,
} from "./navbarTypes"

const initialState = {
  dropMenu: false,
  authForm: false,
}

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DROPMENU_NAVBAR:
      return {
        dropMenu: !state.dropMenu,
        authForm: false,
      }
    case TOGGLE_AUTH_FORM_NAVBAR:
      return {
        dropMenu: false,
        authForm: !state.authForm,
      }
    case RESET_NAVBAR:
      return {
        dropMenu: false,
        authForm: false,
      }
    default:
      return state
  }
}

export default navbarReducer
