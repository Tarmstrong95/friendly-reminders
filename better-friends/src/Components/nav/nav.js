import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { login, logout } from '../../Actions/index'

class Navig extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        if (localStorage.getItem("token")) {
            this.props.login();
        }
        const { activeItem } = this.state

        return (
            <Menu inverted>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />

                {this.props.isLoggedIn && <Menu.Item
                    name='events'
                    active={activeItem === 'events'}
                    onClick={this.handleItemClick}
                    href='/protected'
                />}
                <Menu.Menu position='right'>
                    {this.props.isLoggedIn && <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.props.logout}
                        href='/cred/login'
                    />}
                    {this.props.isLoggedIn && <Menu.Item
                        name={localStorage.getItem('firstname')}
                    />}
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}
export default connect(mapStateToProps, { login, logout })(Navig);


{/* <nav className="main-nav">
      {props.isLoggedIn && <Link onClick={() => props.logout()} className="main-nav-link" to='/cred/login'> Logout</Link>}
        {!props.isLoggedIn && <Link className="main-nav-link" to='/cred/login'> Login</Link>}
        <Link className="main-nav-link" to='/protected'> Events</Link>
        {props.isLoggedIn && <Link className="main-nav-link" >{localStorage.getItem('firstname')}</Link>}
      </nav> */}