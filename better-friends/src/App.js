import React from 'react';
import Container from './Components/login/container'
import Main from './Components/main/index'
import PrivateRoute from './Components/PrivateRoute'
import './App.css'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Navig from './Components/nav/nav';
import {autoLogin} from './Actions/index'





class App extends React.Component {

componentDidMount(){
  const token = localStorage.getItem('token')
  if(token){
    this.props.autoLogin()
  }
}

  render() {
    return (
      <div >
        <Navig />
        <Route path='/login' render={props => <Container {...props} loggedin={props.isLoggedIn} />} />
        <PrivateRoute path='/protected' component={Main} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}
export default connect(mapStateToProps, {autoLogin})(App);
