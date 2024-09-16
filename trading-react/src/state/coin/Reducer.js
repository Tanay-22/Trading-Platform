import * as at  from "./ActionTypes.js"

const initialState =
{
    coinList: [],
    top50: [],
    searchCoinList: [],
    marketChart: { data: [], loading: false },
    coinDetails: null,
    loading: false,
    error: false
};

const coinReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case at.FETCH_COIN_LIST_REQUEST:
        case at.FETCH_COIN_DETAILS_REQUEST:
        case at.SEARCH_COIN_REQUEST:
        case at.FETCH_TOP_50_COINS_REQUEST:
            return { ...state, loading: true, error: null };

        case at.FETCH_MARKET_CHART_REQUEST:
            return {
                ...state,
                marketChart: { loading: true, data: [] },
                error: null
            };

        case at.FETCH_COIN_DETAILS_SUCCESS:
            return { ...state, coinDetails: action.payload, loading: null, error: null };

        case at.FETCH_COIN_LIST_SUCCESS:
            return { ...state, coinList: action.payload, loading: false, error: null };

        case at.FETCH_TOP_50_COINS_SUCCESS:
            return { ...state, top50: action.payload, loading: false, error: null };

        case at.FETCH_MARKET_CHART_SUCCESS:
            return {
                ...state,
                marketChart: { data: action.payload, loading: false },
                error: null
            };

        case at.SEARCH_COIN_SUCCESS:
            return { ...state, searchCoinList: action.payload, loading: false, error: null };

        case at.FETCH_MARKET_CHART_FAILURE:
            return {
                ...state,
                marketChart: { data: [], loading: false },
                error: null
            };

        case at.FETCH_COIN_LIST_FAILURE:
        case at.FETCH_COIN_DETAILS_FAILURE:
        case at.SEARCH_COIN_FAILURE:
        case at.FETCH_TOP_50_COINS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return initialState;
    }
}

export default coinReducer;