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
    REGISTER_FAIL
} from '../Actions';

const initialState = {
    addingEvent: false,
    addingData: false,
    events: [
        {
            event: 'Toms Birthday',
            date: '01/20/94',
            description: 'Birthday party',
            messageDate: '01/19/19',
            message: 'Happy Birthday',
            id: 1
        },
        {
            event: 'testevent2',
            date: 'testdate2',
            description: 'testdesc2',
            messageDate: 'testmsgdate2',
            message: 'testmsg2',
            id: 2
        }
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

        default:
            return state;
    }
}

export default reducer;