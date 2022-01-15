import { SHOW_MODAL, HIDE_MODAL } from "../action/types"
const initialState = {
  isShown: false,
  status: "",
  content: "",
}

export default function globalModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        isShown: true,
        status: action.payload.status,
        content: action.payload.content,
      })
    case HIDE_MODAL:
      return Object.assign({}, state, {
        isShown: false,
        status: null,
        content: null,
      })
    default:
      return state
  }
}
