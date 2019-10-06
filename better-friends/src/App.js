import React from 'react';
import Container from './Components/login/container'
import Main from './Components/main/index'
import PrivateRoute from './Components/PrivateRoute'
import './App.css'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Navig from './Components/nav/nav';





class App extends React.Component {

  render() {
    return (
      <div >
        <Navig />
        <Route path='/cred' render={props => <Container {...props} loggedin={props.isLoggedIn} />} />
        <PrivateRoute path='/protected' component={Main} />
        {/* switch to Route to view page*/}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}
export default connect(mapStateToProps, {})(App);
