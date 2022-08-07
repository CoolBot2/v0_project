import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { messageReducer } from "./messageReducer";
import { conversationReducer } from "./conversationReducer";
export default combineReducers({
  userReducer,
  messageReducer,
  conversationReducer,
});
