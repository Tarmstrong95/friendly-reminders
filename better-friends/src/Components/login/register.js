import React from 'react';
import { register } from '../../Actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Form } from 'semantic-ui-react';

class Register extends React.Component {
    state = {
        un: '',
        pw: '',
        fn: '',
        pn: '',
        reg: false
    }


    handleChanges = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.register();
        this.props.history.push('/protected')
        this.setState({
            un: '',
            pw: '',
            fn: '',
            pn: '',
            reg: true
        })
    }

    render() {
        if(!this.state.reg){
        return (
            <Form onSubmit={this.submit}>
                <Form.Input name="fn" onChange={this.handleChanges} value={this.state.fn} placeholder="First Name" />
                <Form.Input name="pn" onChange={this.handleChanges} value={this.state.pn} placeholder="Phone Number" />
                <Form.Input name="un" onChange={this.handleChanges} value={this.state.un} placeholder="username" />
                <Form.Input name="pw" onChange={this.handleChanges} value={this.state.pw} placeholder="password" />
                <Form.Button>Register</Form.Button>
            </Form>
        )
        }
        return(
            <Redirect to="/login" />
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, {register})(Register);