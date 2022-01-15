import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from "../action/types"
const initialState = {
  token: null,
  user: null,
  error: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload.user,
        token: action.payload.token,
      })
    case AUTH_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      })
    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        user: null,
        token: null,
        error: null,
      })
    default:
      return state
  }
}
