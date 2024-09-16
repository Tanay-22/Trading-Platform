import * as at  from "./ActionTypes.js"
import api from "@/state/apiConfig.js";;


export const getCoinList = (page) => async (dispatch) =>
{
    dispatch({ type: at.FETCH_COIN_LIST_REQUEST });

    try
    {
        const { data } = await api.get(`/api/coins?page=${page}`);
        console.log("getCoinList - action.js - ", data);
        dispatch({ type: at.FETCH_COIN_LIST_SUCCESS, payload: data });
    }
    catch (error)
    {
        dispatch({ type: at.FETCH_COIN_LIST_FAILURE, payload: error.message });
        console.log("getCoinList - action.js - error ", error);
    }
};

export const getTop50Coins = () => async (dispatch) =>
{
    dispatch({ type: at.FETCH_TOP_50_COINS_REQUEST });

    try
    {
        const { data } = await api.get(`/api/coins/top50`);
        console.log("top50 - action.js - ", data);
        dispatch({ type: at.FETCH_TOP_50_COINS_SUCCESS, payload: data });
    }
    catch (error)
    {
        dispatch({ type: at.FETCH_TOP_50_COINS_FAILURE, payload: error.message });
        console.log("top50 - action.js - error ", error);
    }
};

export const getMarketChart = ({ coinId, days }) => async (dispatch) =>
{
    dispatch({ type: at.FETCH_MARKET_CHART_REQUEST });

    try
    {
        const { data } = await api.get(`/api/coins/${coinId}/chart?days=${days}`);
        console.log("market chart - action.js - ", data);
        dispatch({ type: at.FETCH_MARKET_CHART_SUCCESS, payload: data });
    }
    catch (error)
    {
        dispatch({ type: at.FETCH_MARKET_CHART_FAILURE, payload: error.message });
        console.log("market chart - action.js - error ", error);
    }
};

export const getCoinsDetails = (coinId) => async (dispatch) =>
{
    dispatch({ type: at.FETCH_COIN_DETAILS_REQUEST });

    try
    {
        const { data } = await api.get(`/api/coins/details/${coinId}`);
        console.log("coin details - action.js - ", data);
        dispatch({ type: at.FETCH_COIN_DETAILS_SUCCESS, payload: data });
    }
    catch (error)
    {
        dispatch({ type: at.FETCH_COIN_DETAILS_FAILURE, payload: error.message });
        console.log("coin details - action.js - error ", error);
    }
};

export const searchCoin = (keyword) => async (dispatch) =>
{
    dispatch({ type: at.SEARCH_COIN_REQUEST });

    try
    {
        const { data } = await api.get(`/api/coins/search`,
        {
            params : { q: keyword }
        });
        console.log("search coin - action.js - ", data);
        dispatch({ type: at.SEARCH_COIN_SUCCESS, payload: data });
    }
    catch (error)
    {
        dispatch({ type: at.SEARCH_COIN_SUCCESS, payload: error.message });
        console.log("search coin - action.js - error ", error);
    }
};