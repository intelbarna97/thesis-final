import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import commentReducer from "./CommentReducer";
import notificationReducer from "./NotificationReducer";

export const reducers = combineReducers({
  authReducer,
  postReducer,
  commentReducer,
  notificationReducer,
});
