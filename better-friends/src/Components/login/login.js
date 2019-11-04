import React from 'react';
import { login } from '../../Actions/index';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react'
import history from '../../history/history'
class Login extends React.Component {
    state = {
        username: '',//username
        password: ''//password
    }


    handleChanges = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.login(this.state)
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <Form onSubmit={this.submit}>
                <Form.Input name="username" type='username' onChange={this.handleChanges} value={this.state.username} placeholder="username" />
                <Form.Input name="password" type='password' onChange={this.handleChanges} value={this.state.password} placeholder="password" />
                <Form.Button >Login</Form.Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, { login })(Login);