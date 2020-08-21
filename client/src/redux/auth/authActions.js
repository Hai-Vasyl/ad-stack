import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_FAILURE_AUTH,
  SET_TOKEN_AUTH,
  SET_ERROR_AUTH,
  CLEAR_SPECIFIC_ERROR_AUTH,
  CLEAR_ERRORS_AUTH,
  CLEAR_DATA_AUTH,
  UPDATE_START_AUTH,
  UPDATE_SUCCESS_AUTH,
  UPDATE_FAILURE_AUTH,
  UPDATE_AVATAR_AUTH,
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
export const clearData = () => {
  return {
    type: CLEAR_DATA_AUTH,
  }
}
export const updateStart = () => {
  return {
    type: UPDATE_START_AUTH,
  }
}
export const updateSuccess = (user) => {
  return {
    type: UPDATE_SUCCESS_AUTH,
    payload: user,
  }
}
export const updateFailure = (errors) => {
  return {
    type: UPDATE_FAILURE_AUTH,
    payload: errors,
  }
}
export const updateAvatar = (ava) => {
  return {
    type: UPDATE_AVATAR_AUTH,
    payload: ava,
  }
}
