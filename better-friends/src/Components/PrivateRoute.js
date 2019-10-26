import React from 'react';
// eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest}) => {
    return (
        <Route
            {...rest}
            render= {props => {
                if (isLoggedIn) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to = '/login' />;
                }
            }}
        />
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(
    mapStateToProps,
    {}
)(PrivateRoute)
;