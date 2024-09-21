import * as at from "./ActionType.js";
import api from "@/state/apiConfig.js";

export const withdrawalRequest = ({ amount }) => async (dispatch) =>
{
    dispatch({ type: at.WITHDRAWAL_REQUEST });
    try
    {
        const { data } = await api.post(`/api/withdrawal/${amount}`, null);
        dispatch({ type: at.WITHDRAWAL_SUCCESS, payload: data });
        console.log("withdrawal -->", data);
    }
    catch (error)
    {
        dispatch({ type: at.WITHDRAWAL_FAILURE, payload: error.message });
    }
};

export const proceedWithdrawal = ({ id, accept }) => async (dispatch) =>
{
    dispatch({ type: at.WITHDRAWAL_PROCEED_REQUEST });
    try
    {
        const { data } = api.post(`/api/withdrawal/admin/${id}/proceed/${accept}`, null);
        dispatch({ type: at.WITHDRAWAL_PROCEED_SUCCESS, payload: data });
        console.log("proceed with withdrawal data", data);
    }
    catch (error)
    {
        dispatch({ type: at.WITHDRAWAL_PROCEED_FAILURE, payload: error.message });
    }
};

// user's history
export const getWithdrawalHistory = () => async (dispatch) =>
{
    dispatch({ type: at.GET_WITHDRAWAL_HISTORY_REQUEST });
    try
    {
        const { data } = api.get(`/api/withdrawal`);
        dispatch({ type: at.GET_WITHDRAWAL_HISTORY_SUCCESS, payload: data });
        console.log("withdrawal history", data);
    }
    catch (error)
    {
        dispatch({ type: at.GET_WITHDRAWAL_HISTORY_FAILURE, payload: error.message });
    }
};

// for admin to approve
export const getAllWithdrawalRequest = () => async (dispatch) =>
{
    dispatch({ type: at.GET_WITHDRAWAL_REQUEST_REQUEST });
    try
    {
        const { data } = api.get(`/api/withdrawal/admin`);
        dispatch({ type: at.GET_WITHDRAWAL_REQUEST_SUCCESS, payload: data });
        console.log("admin get withdrawal request data", data);
    }
    catch (error)
    {
        dispatch({ type: at.GET_WITHDRAWAL_REQUEST_FAILURE, payload: error.message });
    }
};

export const addPaymentDetails = ({ paymentDetails }) => async (dispatch) =>
{
    dispatch({ type: at.ADD_PAYMENT_DETAILS_REQUEST });
    try
    {
        const { data } = await api.post(`/api/payment-details`, paymentDetails);
        dispatch({ type: at.ADD_PAYMENT_DETAILS_SUCCESS, payload: data });
        console.log("add payment details", data);
    }
    catch (error)
    {
        dispatch({ type: at.ADD_PAYMENT_DETAILS_FAILURE, payload: error.message });
    }
};

export const getPaymentDetails = () => async (dispatch) =>
{
    dispatch({ type: at.GET_PAYMENT_DETAILS_REQUEST });
    try
    {
        const { data } = await api.get(`/api/payment-details`);
        dispatch({ type: at.GET_PAYMENT_DETAILS_SUCCESS, payload: data });
        console.log("get payment details", data);
    }
    catch (error)
    {
        dispatch({ type: at.GET_PAYMENT_DETAILS_FAILURE, payload: error.message });
    }
};

