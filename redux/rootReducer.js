import { combineReducers } from "redux";
import splashReduser from './splash';
import getWalkThroughReducer from './walkthrough';
import signupreducer from './signupreducer';
import postLoginReduser from "./loginreducer";
import profileReducer from "./profilereducer";
import SettingsReducer from "./settingsreducer";
import alertsReducer from "./alertReducer";
import postPageReducer from "./postPageReducer";
import likesCommentPageReducer from "./likesCommentPageReducer";
import chatReducer from "./chatReducer"

const rootReducer = combineReducers({
    splash:splashReduser, 
    walkthrough: getWalkThroughReducer,
    signup: signupreducer,
    login: postLoginReduser,
    profile: profileReducer,
    settings: SettingsReducer,
    alerts: alertsReducer,
    posts: postPageReducer,
    likesComments: likesCommentPageReducer,
    chat: chatReducer
});

export default rootReducer;
