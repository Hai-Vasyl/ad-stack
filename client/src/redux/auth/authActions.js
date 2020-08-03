import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_FAILURE_AUTH,
  SET_TOKEN_AUTH,
  SET_ERROR_AUTH,
  CLEAR_SPECIFIC_ERROR_AUTH,
  CLEAR_ERRORS_AUTH,
} from "./authTypes"

export const fetchStart = () => {
  return {
    type: FETCH_START_AUTH,
  }
}
export const fetchSuccess = (auth) => {
  return {
    type: FETCH_SUCCESS_AUTH,
    payload: auth,
  }
}
export const fetchFailure = (error) => {
  return {
    type: FETCH_FAILURE_AUTH,
    payload: error,
  }
}
export const setError = (item) => {
  return {
    type: SET_ERROR_AUTH,
    payload: item,
  }
}
export const clearSpecificError = (item) => {
  return {
    type: CLEAR_SPECIFIC_ERROR_AUTH,
    payload: item,
  }
}
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS_AUTH,
  }
}
export const setToken = () => {
  return {
    type: SET_TOKEN_AUTH,
  }
}
