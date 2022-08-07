import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_FAILED,
  GET_CONVERSATIONS_SUCCESSFUL,
} from "../actionTypes";

const initialState = { conversations: [], loading: false, errors: [] };

export const conversationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_CONVERSATIONS:
      return { ...state, loading: true };
    case GET_CONVERSATIONS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        conversations: [...state.conversations, ...payload],
      };
    case GET_CONVERSATIONS_FAILED:
      return { ...state, loading: false, errors: payload };

    default:
      return state;
  }
};
