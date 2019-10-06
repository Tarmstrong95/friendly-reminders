import React from 'react';
import Login from './login';
import Register from './register';
import { Segment, Grid, Divider, Header } from 'semantic-ui-react';

const Container = props => {

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

export default Container; 