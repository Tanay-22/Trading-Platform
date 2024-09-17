import * as at from "./ActionType.js";
import api from "@/state/apiConfig.js";

export const getUserWallet = () => async (dispatch) =>
{
    dispatch({ type: at.GET_USER_WALLET_REQUEST });

    try
    {
        const { data } = api.get(`/api/wallet`);
        dispatch({ type: at.GET_USER_WALLET_SUCCESS, payload: data });
        console.log(data);
    }
    catch (error)
    {
        dispatch({ type: at.GET_USER_WALLET_FAILURE, payload: error.message });
    }
};

export const getTransactionHistory = (walletId) => async (dispatch) =>
{
    dispatch({ type: at.GET_TRANSACTION_HISTORY_REQUEST });

    try
    {
        const { data } = api.get(`/api/wallet/transaction-history`);
        dispatch({ type: at.GET_TRANSACTION_HISTORY_SUCCESS, payload: data });
        console.log(data);
    }
    catch (error)
    {
        dispatch({ type: at.GET_TRANSACTION_HISTORY_FAILURE, payload: error.message });
    }
};

export const depositMoney = ({orderId, paymentId, navigate }) => async (dispatch) =>
{
    dispatch({ type: at.DEPOSIT_MONEY_REQUEST });

    try
    {
        const { data } = api.put(`/api/wallet/deposite`, null,
            {
                params:
                {
                    order_id: orderId,
                    payment_id: paymentId
                }
            });
        dispatch({ type: at.DEPOSIT_MONEY_SUCCESS, payload: data });
        console.log(data);
    }
    catch (error)
    {
        dispatch({ type: at.DEPOSIT_MONEY_FAILURE, payload: error.message });
    }
};

export const paymentHandler = ({ amount, paymentMethod }) => async (dispatch) =>
{
    // dispatch({ type: at.TRANSFER_MONEY_REQUEST });

    try
    {
        const { data } = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null);

        window.location.href = data.payment_url;
    }
    catch (error)
    {
        console.log("payment error ->", error);
    }
};

export const transferMoney = ({ walletId, reqData }) => async (dispatch) =>
{
    dispatch({ type: at.TRANSFER_MONEY_REQUEST });

    try
    {
        const { data } = await api.put(`/api/wallet/${walletId}/transfer`, reqData);

        dispatch({ type: at.TRANSFER_MONEY_SUCCESS, paylaod: data });
    }
    catch (error)
    {
        dispatch({ type: at.TRANSFER_MONEY_FAILURE, payload: error.message });
        console.log("transfer money error ->", error);
    }
};