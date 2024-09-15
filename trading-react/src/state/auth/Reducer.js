import * as at  from "./ActionTypes.js"

const initialState =
{
    user: null,
    loading: false,
    error: null,
    jwt: null
};

const authReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case at.REGISTER_REQUEST:
            return {...state, loading: true, error: null };

        case at.REGISTER_SUCCESS:
        case at.LOGIN_SUCCESS:
            return { ... state, loading: false, error: null, jwt: action.payload };

        case at.GET_USER_SUCCESS:
            // console.log("get user in reducer",action.payload);
            return { ... state, loading: false, error: null, user: action.payload };

        case at.REGISTER_FAILURE:
        case at.LOGIN_FAILURE:
        case at.GET_USER_FAILURE:
            return { ... state, loading: false, error: action.payload };

        case at.LOGOUT:
            return initialState;

        default:
            return state;

    }
};

export default authReducer;