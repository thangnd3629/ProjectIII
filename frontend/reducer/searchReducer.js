const initialState = {
  query: "",
  isQuerying: false,
}
import { PERFORM_GLOBAL_QUERY, CANCEL_GLOBAL_QUERY } from "../action/types"

export default function search(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case PERFORM_GLOBAL_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
        isQuerying: true,
      })
    case CANCEL_GLOBAL_QUERY:
      return Object.assign({}, state, {
        isQuerying: false,
        query: "",
      })
    default:
      return state
  }
}
