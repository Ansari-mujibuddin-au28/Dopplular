import { combineReducers } from "redux";
import splashReduser from './splash';
import getWalkThroughReducer from './walkthrough';
import signupreducer from './signupreducer';
import postLoginReduser from "./loginreducer";
import profileReducer from "./profilereducer";
import SettingsReducer from "./settingsreducer";

const rootReducer = combineReducers({
    splash:splashReduser, 
    walkthrough: getWalkThroughReducer,
    signup: signupreducer,
    login: postLoginReduser,
    profile: profileReducer,
    settings: SettingsReducer,
});

export default rootReducer;
