import {
  GET_ALL_USERS,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_SUCCESSFUL,
  GET_ONE_USER,
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESSFUL,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESSFUL,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESSFUL,
} from "../actionTypes";

const initialState = {
  loading: false,
  usersList: [],
  errors: [],
  isOnline: false,
  token: null,
  allUsers: [],
  LoggedUser: null,
  auth: null,
  isSignedUp: false,
  userById: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
    case GET_PROFILE:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        loading: false,

        usersList: payload,
        isSignedUp: true,
        errors: null,
      };
    case REGISTER_USER_FAILED:
    case LOGIN_USER_FAILED:
    case GET_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case LOGIN_USER_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        errors: null,
        token: payload.token,
        usersList: payload.user,
      };
    case GET_PROFILE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        errors: null,
        isOnline: true,
        usersList: payload,
      };
    case GET_ONE_USER:
      return {
        ...state,
        loading: false,
        errors: null,
        userById: [...state.userById, payload],
      };
    default:
      return state;
  }
};
