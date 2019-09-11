import {combineReducers} from "redux";
import loanReducers from "./loanReducers.js";

const rootReducer = combineReducers({
	loan: loanReducers
});

export default rootReducer;

