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
    REGISTER_START,
    REGISTER_SUCCESS,// eslint-disable-next-line
    REGISTER_FAIL,
    EDIT_START,
    EDIT_SUCCESS,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    EDIT_FAIL,
    RESET_EDIT

} from '../Actions';

const initialState = {
    addingEvent: false,
    addingData: false,
    editingEvent: false,
    editingEventSuccess: false,
    editingEventFail: false,
    events: [
        {
            event: 'Toms Birthday',
            date: '01/20/94',
            type: 'Birthday',
            messageDate: '01/19/19',
            message: 'Happy Birthday',
            id: 1,
        },
        {
            event: 'Test Wedding',
            date: 'testdate2',
            type: 'Wedding',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 2,
        },
        {
            event: 'Test Holiday',
            date: 'testdate2',
            type: 'Anniversary',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 3,
        },
        {
            event: 'Test Anniversary',
            date: 'testdate2',
            type: 'Holiday',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 4,
        },
        {
            event: 'Toms Birthday',
            date: '01/20/94',
            type: 'Birthday',
            messageDate: '01/19/19',
            message: 'Happy Birthday',
            id: 5,
        },
        {
            event: 'Test Wedding',
            date: 'testdate2',
            type: 'Wedding',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 6,
        },
        {
            event: 'Test Holiday',
            date: 'testdate2',
            type: 'Anniversary',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 7,
        },
        {
            event: 'Test Anniversary',
            date: 'testdate2',
            type: 'Holiday',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 8,
        },
        {
            event: 'Toms Birthday',
            date: '01/20/94',
            type: 'Birthday',
            messageDate: '01/19/19',
            message: 'Happy Birthday',
            id: 9,
        },
        {
            event: 'Test Wedding',
            date: 'testdate2',
            type: 'Wedding',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 10,
        },
        {
            event: 'Test Holiday',
            date: 'testdate2',
            type: 'Anniversary',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 11,
        },
        {
            event: 'Test Anniversary',
            date: 'testdate2',
            type: 'Holiday',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 12,
        },
    ],
    error: '',
    loggingIn: false,
    isLoggedIn: false,
    token: '39f7gb5sug63983nf84bf73odnggt739d'
};

const reducer = (state = initialState, action) => {
    console.log(action);
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
                    ...state.events,
                    action.payload,
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
                addingData: false
                //update state data here
            });
        case EDIT_START:
            return {
                ...state,
                editingEvent: true
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
                isLoggedIn: true
            });

        case REGISTER_START:
            return ({});
        case REGISTER_SUCCESS:
            return ({
                ...state,
                isLoggedIn: true
            });
        case LOGOUT_SUCCESS:
            return ({
                ...state,
                isLoggedIn: false
            });

        default:
            return state;
    }
}

export default reducer;