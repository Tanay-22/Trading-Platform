import * as at from "./ActionType.js";

const initialState =
{
    userWallet: {},
    loadinng: false,
    error: null,
    transactions: []
};

const walletReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case at.GET_USER_WALLET_REQUEST:
        case at.DEPOSIT_MONEY_REQUEST:
        case at.TRANSFER_MONEY_REQUEST:
        case at.GET_TRANSACTION_HISTORY_REQUEST:
            return { ...state, loading: false, error: null };

        case at.GET_TRANSACTION_HISTORY_SUCCESS:
            return { ...state, loading: false, error: null, transactions: action.payload };

        case at.GET_USER_WALLET_SUCCESS:
        case at.TRANSFER_MONEY_SUCCESS:
            return { ...state, userWallet: action.payload, loading: false, error: null };

        case at.DEPOSIT_MONEY_SUCCESS:
            return { ...state, userWallet: action.payload, loading: false, error: null };

        case at.GET_USER_WALLET_FAILURE:
        case at.DEPOSIT_MONEY_FAILURE:
        case at.TRANSFER_MONEY_FAILURE:
        case at.GET_TRANSACTION_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return initialState;
    }
};

export default walletReducer;