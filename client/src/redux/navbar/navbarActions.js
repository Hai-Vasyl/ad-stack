import {
  TOGGLE_DROPMENU_NAVBAR,
  TOGGLE_AUTH_FORM_NAVBAR,
  RESET_NAVBAR,
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