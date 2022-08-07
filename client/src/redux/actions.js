import {
  GET_ALL_USERS,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_SUCCESSFUL,
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_FAILED,
  GET_CONVERSATIONS_SUCCESSFUL,
  GET_ONE_USER,
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESSFUL,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESSFUL,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESSFUL,
  SEND_MESSAGE,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESSFUL,
  SHOW_MESSAGE,
  SHOW_MESSAGE_FAILED,
  SHOW_MESSAGE_SUCCESSFUL,
} from "./actionTypes";
import axios from "axios";
export const registerUser = (newUser) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const { data } = await axios.post("/user/register", newUser);
    dispatch({
      type: REGISTER_USER_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILED,
      payload: error.response.data,
    });
  }
};
export const loginUser = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
  });
  try {
    const { data } = await axios.post("/user/login", user);
    localStorage.setItem("token", data.token);
    dispatch({
      type: LOGIN_USER_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILED,
      payload: error.response.data,
    });
  }
};
export const getProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const { data } = await axios.get("/user/auth", config);
    dispatch({
      type: GET_PROFILE_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILED,
      payload: error.response.data,
    });
  }
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER,
  });
};
export const sendMessage = (newMessage) => async (dispatch) => {
  try {
    const { data } = await axios.post("/message/sendMsg", newMessage);
    dispatch({
      type: SEND_MESSAGE_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAILED,
      payload: error.response.data,
    });
  }
};
export const showMessage = (conversationId) => async (dispatch) => {
  dispatch({
    type: SHOW_MESSAGE,
  });
  try {
    const { data } = await axios.get(`/message/showMsg/${conversationId}`);
    dispatch({
      type: SHOW_MESSAGE_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOW_MESSAGE_FAILED,
      payload: error.response.data,
    });
  }
};
export const getAll = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USERS,
  });
  try {
    const { data } = await axios.get("/user/getAll");
    dispatch({
      type: GET_ALL_USERS_SUCCESSFUL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAILED,
      payload: error.response.data,
    });
  }
};
export const getConversations = (UserId) => async (dispatch) => {
  dispatch({
    type: GET_CONVERSATIONS,
  });
  try {
    const res = await axios.get(`/conversation/convo/${UserId}`);
    dispatch({
      type: GET_CONVERSATIONS_SUCCESSFUL,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONVERSATIONS_FAILED,
      payload: error.response.data,
    });
  }
};

export const getOneUser = (UserId) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/${UserId}`);
    dispatch({
      type: GET_ONE_USER,
      payload: res.data,
    });
  } catch (error) {}
};
