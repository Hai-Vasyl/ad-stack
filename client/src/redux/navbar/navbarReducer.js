import {
  TOGGLE_DROPMENU_NAVBAR,
  TOGGLE_AUTH_FORM_NAVBAR,
  RESET_NAVBAR,
  TOGGLE_POPUP_WARNING_NAVBAR,
} from "./navbarTypes"

const initialState = {
  dropMenu: false,
  authForm: false,
  popupWarning: false,
}

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DROPMENU_NAVBAR:
      return {
        dropMenu: !state.dropMenu,
        authForm: false,
        popupWarning: false,
      }
    case TOGGLE_AUTH_FORM_NAVBAR:
      return {
        dropMenu: false,
        authForm: !state.authForm,
        popupWarning: false,
      }
    case RESET_NAVBAR:
      return {
        dropMenu: false,
        authForm: false,
        popupWarning: false,
      }
    case TOGGLE_POPUP_WARNING_NAVBAR:
      return {
        dropMenu: false,
        authForm: false,
        popupWarning: !state.popupWarning,
      }
    default:
      return state
  }
}

export default navbarReducer
