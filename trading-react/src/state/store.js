import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import authReducer from "@/state/auth/Reducer.js";
import coinReducer from "@/state/coin/Reducer.js";
import walletReducer from "@/state/wallet/Reducer.js";

const rootReducer = combineReducers(
    {
        auth: authReducer,
        coin: coinReducer,
        wallet: walletReducer
    }
);


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));