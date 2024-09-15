import * as at  from "./ActionTypes.js"
import {API_BASE_URL} from "@/state/apiConfig.js";
import axios from "axios";



export const register = (userData) => async (dispatch) =>
{
    // console.log(userData)
    dispatch({ type: at.REGISTER_REQUEST })

    try
    {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        // console.log(user);
        localStorage.setItem("jwt", user.jwt);

        dispatch({ type: at.REGISTER_SUCCESS, payload: user.jwt });
    }
    catch (error)
    {
        dispatch({ type: at.REGISTER_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const login = (userData) => async (dispatch) =>
{
    dispatch({ type: at.LOGIN_REQUEST })

    try
    {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData.data);
        const user = response.data;
        // console.log(user);
        if (user.jwt)
        {
            localStorage.setItem("jwt", user.jwt);
            dispatch({type: at.LOGIN_SUCCESS, payload: user.jwt });
            userData.navigate("/");
        }

    }
    catch (error)
    {
        dispatch({ type: at.LOGIN_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const getUser = (jwt) => async (dispatch) =>
{
    dispatch({ type: at.GET_USER_REQUEST })

    try
    {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`,
            {
                headers:
                {
                    Authorization : `Bearer ${jwt}`
                }
            });
        const user = response.data;
        // console.log("get user", user);

        dispatch({ type: at.GET_USER_SUCCESS, payload: user });
    }
    catch (error)
    {
        dispatch({ type: at.GET_USER_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const logout = () => (dispatch) =>
{
    localStorage.clear();
    dispatch({ type: at.LOGOUT, payload: null });
};