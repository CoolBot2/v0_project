import {
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESSFUL,
  SHOW_MESSAGE,
  SHOW_MESSAGE_FAILED,
  SHOW_MESSAGE_SUCCESSFUL,
} from "../actionTypes";

const initialState = {
  loading: false,
  messagesList: [],
  errors: null,
};

export const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_MESSAGE:
    case SHOW_MESSAGE:
      return {
        ...state,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        messagesList: [...state.messagesList, payload],
        errors: null,
      };
    case SHOW_MESSAGE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        messagesList: payload,
        errors: null,
      };

    case SEND_MESSAGE_FAILED:
    case SHOW_MESSAGE_FAILED:
      return { ...state, loading: false, errors: payload };
    default:
      return state;
  }
};
