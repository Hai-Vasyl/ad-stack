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

const initialState = {
  load: false,
  token: {},
  error: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START_AUTH:
      return {
        load: true,
        token: {},
        error: [],
      }
    case FETCH_SUCCESS_AUTH:
      const { data } = action.payload
      localStorage.setItem("auth", JSON.stringify(data))
      return {
        load: false,
        token: data,
        error: [],
      }
    case FETCH_FAILURE_AUTH:
      return {
        load: false,
        token: {},
        error: action.payload,
      }
    case SET_ERROR_AUTH:
      const { param } = action.payload
      return {
        ...state,
        error: [...state.error, { param, msg: "Fill this field!" }],
      }
    case CLEAR_SPECIFIC_ERROR_AUTH:
      return {
        ...state,
        error: state.error.map((err) => {
          if (err.param === action.payload.param) {
            err.msg = ""
          }
          return err
        }),
      }
    case CLEAR_ERRORS_AUTH:
      return {
        ...state,
        error: [],
      }
    case SET_TOKEN_AUTH:
      const auth = localStorage.getItem("auth")
      if (!auth) {
        return state
      }
      return {
        ...state,
        token: JSON.parse(auth),
      }
    case CLEAR_DATA_AUTH:
      localStorage.removeItem("auth")
      return {
        ...state,
        token: {},
      }
    case UPDATE_START_AUTH:
      return {
        ...state,
        load: true,
      }
    case UPDATE_SUCCESS_AUTH:
      const token = { ...state.token, user: action.payload.data }
      localStorage.setItem("auth", JSON.stringify(token))
      return {
        error: [],
        load: false,
        token,
      }
    case UPDATE_FAILURE_AUTH:
      return {
        ...state,
        load: false,
        error: action.payload,
      }
    case UPDATE_AVATAR_AUTH:
      const tokenNew = {
        ...state.token,
        user: { ...state.token.user, ava: action.payload.data },
      }
      localStorage.setItem("auth", JSON.stringify(tokenNew))
      return {
        ...state,
        token: tokenNew,
      }
    default:
      return state
  }
}

export default authReducer
