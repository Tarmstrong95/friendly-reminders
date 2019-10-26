import axios from 'axios';


export const GET_DATA_START = 'ADD_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'GET_DATA_FAIL';

const host = 'http://localhost:4000/'

export const getData = (userid) => dispatch => {
    dispatch({ type: GET_DATA_START })
    axios
        .get(`${host}reminders/${userid}`)
        .then(res => {
            dispatch({ type: GET_DATA_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: GET_DATA_FAIL, payload: err.response })
        })
}


export const ADD_START = 'ADD_START';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAIL = 'ADD_FAIL';

export const addEvent = (event) => dispatch => {
    dispatch({ type: ADD_START });
    return axios
        .post(`${host}reminders`, event)
        .then(res => {
            dispatch({ type: ADD_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ADD_FAIL, payload: err.message });
        });
}

export const EDIT_START = 'EDIT_START';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAIL = 'EDIT_FAIL';
export const RESET_EDIT = 'RESET_EDIT';

export const editEvent = event => dispatch => {
    dispatch({ type: EDIT_START })
    const newEvent = {
        description: event.description,
        message: event.message,
        type: event.type,
        date: event.date,
        messagedate: event.messagedate

    }
    return axios
        .put(`${host}reminders/${event.id}`, newEvent)
        .then(res => {
            console.log('data: ', res.data)
            dispatch({ type: EDIT_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err.response);
            dispatch({ type: EDIT_FAIL, payload: err.response });
        });
}

export const resetEdit = () => dispatch => {
    dispatch({ type: RESET_EDIT })
}


export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAIL = 'DELETE_FAIL';

export const deleteEvent = id => dispatch => {
    dispatch({ type: DELETE_START });
    axios 
        .delete(`${host}reminders/${id}`)
        .then(res => {
            dispatch({ type: DELETE_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err.response)
            dispatch({ type: DELETE_FAIL, payload: err.response })
        })
}


export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const login = (creds) => dispatch => {
    dispatch({ type: LOGIN_START })
    axios.post(`${host}auth/login`, creds)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.user })
        })
        .catch(err => { dispatch({ type: LOGIN_FAIL, payload: err }) })
}

export const AUTO_LOGIN_START = 'LOGIN_START';
export const AUTO_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTO_LOGIN_FAIL = 'LOGIN_FAIL';

export const autoLogin = (stuff) => dispatch => {
    dispatch({ type: AUTO_LOGIN_START })
    // send token header from localstorage
    axios.post(`${host}auth/login/auto`, stuff, { headers: { "Authorization": localStorage.getItem('token') } })
        .then(res => dispatch({ type: AUTO_LOGIN_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: AUTO_LOGIN_FAIL, payload: err }))
}

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const register = creds => dispatch => {
    // dispatch({ type: REGISTER_START })
    // axios.put('***LINK***', creds)
    //     .then(res => {
    //         localStorage.setItem('token', res.data)
    //         dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    //     })
    //     .catch(err => { dispatch({ type: REGISTER_FAIL, payload: err }) })

    dispatch({ type: REGISTER_SUCCESS })
}

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const logout = creds => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS })
    localStorage.removeItem('token')
}