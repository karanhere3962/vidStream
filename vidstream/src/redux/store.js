import userReducer from "./user/authReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ThunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(ThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
