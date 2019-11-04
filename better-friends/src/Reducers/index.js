import {
    ADD_START,
    ADD_SUCCESS,// eslint-disable-next-line
    ADD_FAIL,

    GET_DATA_START,
    GET_DATA_SUCCESS,// eslint-disable-next-line
    GET_DATA_FAIL,

    LOGIN_START,
    LOGIN_SUCCESS,// eslint-disable-next-line
    LOGIN_FAIL,

    LOGOUT_SUCCESS,

    AUTO_LOGIN_START,
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAIL,

    REGISTER_START,
    REGISTER_SUCCESS,// eslint-disable-next-line
    REGISTER_FAIL,

    EDIT_START,
    EDIT_SUCCESS,
    EDIT_FAIL,

    DELETE_START,
    DELETE_SUCCESS,
    DELETE_FAIL,

    RESET_EDIT

} from '../Actions';

const initialState = {
    addingEvent: false,

    addingData: false,
    events: null,
    getDataFail: null,

    editingEvent: false,
    editingEventSuccess: false,
    editingEventFail: false,
    error: '',

    loggingIn: false,
    isLoggedIn: false,
    loginFail: null,

    deletingEvent: false,
    deletingEventErorr: false,

    user: {
        username: null,
        id: null,
        firstname: null,
        lastname: null,
        email: null,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_START:
            return ({
                ...state,
                addingEvent: true,
            });
        case ADD_SUCCESS:
            return ({
                ...state,
                addingEvent: true,
                error: '',
                events: [
                    action.payload,
                    ...state.events,
                ]
            });

        case GET_DATA_START:
            return ({
                ...state,
                addingData: true
            });
        case GET_DATA_SUCCESS:
            return ({
                ...state,
                addingData: false,
                events: action.payload
            });
        case GET_DATA_FAIL:
            return {
                ...state,
                addingData: false,
                getDataFail: action.payload
            }
        case EDIT_START:
            return {
                ...state,
                editingEvent: true,
                editingEventSuccess: false,
                editingEventFail: false
            };
        case EDIT_SUCCESS:
            return {
                ...state,
                editingEvent: false,
                error: '',
                editingEventSuccess: true,
                events: action.payload
            };
        case EDIT_FAIL:
            return {
                ...state,
                editingEvent: false,
                editingEventFail: true,
                error: action.payload
            }
        case RESET_EDIT:
            return {
                ...state,
                editingEvent: false,
                editingEventFail: false,
                editingEventSuccess: false
            }


        case LOGIN_START:
            return ({
                ...state,
                loggingIn: true
            });
        case LOGIN_SUCCESS:
            return ({
                ...state,
                loggingIn: false,
                isLoggedIn: true,
                user: { ...action.payload }
            });
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload
            }


        case REGISTER_START:
            return {
                ...state,
                isRegistering: true,
            }
        case REGISTER_SUCCESS:
            return ({
                ...state,
                isRegistering: false,
                registered: true,
            });
        case REGISTER_FAIL:
            return {
                ...state,
                isRegistering: false,
                registerError: action.payload
            }
        case LOGOUT_SUCCESS:
            return ({
                ...state,
                isLoggedIn: false
            });

        case AUTO_LOGIN_START:
            return {
                ...state,
                loggingIn: true
            }
        case AUTO_LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                user: action.payload
            }
        case AUTO_LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload
            }
        case DELETE_START:
            return {
                ...state,
                deletingEvent: true
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                deletingEvent: false,
                events: (events => {
                    return events.filter(event => event.id !== action.payload)
                })(state.events)
            }
        case DELETE_FAIL:
            return {
                ...state,
                deletingEvent: false,
                deletingEventErorr: action.payload
            }

        default:
            return state;
    }
}

export default reducer;