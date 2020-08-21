import {
  TOGGLE_DROPMENU_NAVBAR,
  TOGGLE_AUTH_FORM_NAVBAR,
  RESET_NAVBAR,
  TOGGLE_POPUP_WARNING_NAVBAR,
  TOGGLE_POPUP_IMAGE,
} from "./navbarTypes"

export const toggleDropMenu = () => {
  return {
    type: TOGGLE_DROPMENU_NAVBAR,
  }
}
export const toggleAuthForm = () => {
  return {
    type: TOGGLE_AUTH_FORM_NAVBAR,
  }
}
export const resetNavbar = () => {
  return {
    type: RESET_NAVBAR,
  }
}
export const togglePopupWarning = () => {
  return {
    type: TOGGLE_POPUP_WARNING_NAVBAR,
  }
}
export const togglePopupImage = () => {
  return {
    type: TOGGLE_POPUP_IMAGE,
  }
}
