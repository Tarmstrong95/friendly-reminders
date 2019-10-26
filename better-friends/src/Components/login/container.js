import React from 'react';
import Login from './login';
import Register from './register';
import { Segment, Grid, Divider, Header } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';

const Container = props => {

    if(window.location.pathname === '/login' && 
    props.isLoggedIn){
        return <Redirect to='/protected' />
    }
    return (

        <Segment className='noborder'>
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <Header as='h1'>Login</Header>
                    <Login />
                </Grid.Column>
                <Grid.Column>
                <Header as='h1'>Register</Header>
                    <Register />
                </Grid.Column>
            </Grid>
            <Divider vertical>OR</Divider>
        </Segment>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}
export default withRouter(connect(mapStateToProps, {})(Container)); 