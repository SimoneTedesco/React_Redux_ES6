import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorsReducers";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducers = combineReducers({
    courses,
    authors,
    apiCallsInProgress
});

export default rootReducers;
