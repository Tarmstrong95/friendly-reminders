import React from 'react';
import { login } from '../../Actions/index';
import {connect} from 'react-redux';
import {Form} from 'semantic-ui-react'
import history from '../../history/history'
class Login extends React.Component {
    state = {
        un: '',//username
        pw: ''//password
    }


    handleChanges = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        if (localStorage.getItem('username') !== '' && localStorage.getItem('password') !== '' && localStorage.getItem('username') === this.state.un && localStorage.getItem('password') === this.state.pw) {
           localStorage.setItem("token", this.props.token)
            this.props.login()
            history.push('/protected')
        }else{
            alert('INCORRECT CREDENTIALS!')
        }

        this.setState({
            un: '',
            pw: ''
        })
    }

    render() {
        return (
            <Form>
                <Form.Input name="un" onChange={this.handleChanges} value={this.state.un} placeholder="username" />
                <Form.Input name="pw" onChange={this.handleChanges} value={this.state.pw} placeholder="password" />
                <Form.Button onClick={this.submit}>Login</Form.Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, {login})(Login);