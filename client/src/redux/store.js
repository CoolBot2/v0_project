import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
const dev_tools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, compose(applyMiddleware(thunk), dev_tools));
export default store;
