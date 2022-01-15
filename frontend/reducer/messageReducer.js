import {
  EXIT_CHAT,
  ADD_MESSAGE,
  INIT_CONVERSATION,
  FETCH_OLD_MESSAGES,
} from "../action/types"
const initialState = {
  conversationId: null,
  messages: [],
  partner: null,
  page: 0,
}

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [...action.payload.messages, ...state.messages],
      })

    case EXIT_CHAT:
      return Object.assign({}, state, {
        messages: [],
        conversationId: null,
        partner: null,
        page: 0,
      })
    case INIT_CONVERSATION:
      return Object.assign({}, state, {
        messages: [...action.payload.messages],
        partner: { ...action.payload.partner },
        conversationId: action.payload.conversationId,
      })
    case FETCH_OLD_MESSAGES:
      return Object.assign({}, state, {
        page: state.page + 1,
      })
    default:
      return state
  }
}
