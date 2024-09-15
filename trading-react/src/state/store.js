import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import authReducer from "@/state/auth/Reducer.js";

const rootReducer = combineReducers(
    {
    auth: authReducer,
    }
);


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

console.log(store.getState());