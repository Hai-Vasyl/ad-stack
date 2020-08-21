import {
  TOGGLE_DROPMENU_NAVBAR,
  TOGGLE_AUTH_FORM_NAVBAR,
  RESET_NAVBAR,
  TOGGLE_POPUP_WARNING_NAVBAR,
  TOGGLE_POPUP_IMAGE,
} from "./navbarTypes"

const initialState = {
  dropMenu: false,
  authForm: false,
  popupWarning: false,
  popupImage: false,
}

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DROPMENU_NAVBAR:
      return {
        dropMenu: !state.dropMenu,
        authForm: false,
        popupWarning: false,
        popupImage: false,
      }
    case TOGGLE_AUTH_FORM_NAVBAR:
      return {
        dropMenu: false,
        authForm: !state.authForm,
        popupWarning: false,
        popupImage: false,
      }
    case RESET_NAVBAR:
      return {
        dropMenu: false,
        authForm: false,
        popupWarning: false,
        popupImage: false,
      }
    case TOGGLE_POPUP_WARNING_NAVBAR:
      return {
        dropMenu: false,
        authForm: false,
        popupWarning: !state.popupWarning,
        popupImage: false,
      }
    case TOGGLE_POPUP_IMAGE:
      return {
        dropMenu: false,
        authForm: false,
        popupWarning: false,
        popupImage: !state.popupImage,
      }
    default:
      return state
  }
}

export default navbarReducer
