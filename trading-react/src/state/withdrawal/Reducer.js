import * as at from "./ActionType.js";

const initialState =
{
    withdrawal: null,
    history: [],
    loading: false,
    error: null,
    paymentDetails: null,
    requests: []
};

const withdrawalReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case at.WITHDRAWAL_REQUEST:
        case at.WITHDRAWAL_PROCEED_REQUEST:
        case at.GET_WITHDRAWAL_HISTORY_REQUEST:
        case at.GET_WITHDRAWAL_REQUEST_REQUEST:
            return { ...state, loading: true, error: null };

        case at.WITHDRAWAL_SUCCESS:
            return { ...state, withdrawal: action.payload, loading: false, error: null };
    }
}