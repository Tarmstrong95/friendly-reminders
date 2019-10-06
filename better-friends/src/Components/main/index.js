import React from 'react';
import { Route, Link } from 'react-router-dom';
import newEvent from './newEvent';
import { connect } from 'react-redux';

import { deleteEvent, editEvent, getData, saveEdit } from '../../Actions';

import EditForm from './EditForm';
import { Header, Container, Dropdown, Card, Message, Icon, Menu, Divider } from 'semantic-ui-react';


class Main extends React.Component {
    state = {
        deletingEvent: null,
        editingEventId: null,
        selectType: 'all'
    };

    // componentDidMount() {
    //     this.props.getData();
    // }

    deleteEvent = id => {
        this.setState({ deletingEventId: id })
        this.props.deleteEvent(id);
    };

    closeEdit = () => {
        this.setState({ editingEventId: '' })
    }


    FilteredEvents = (events) => {
        if (this.state.selectType === 'all') {
            return events
        }
        return events.filter(event => {
            return (event.type === this.state.selectType)
        })
    }

    onChange = e => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })

    }



    render() {
        return (
            <Container textAlign='center'>
                <Header as='h1'>
                    Events
                    <div className='newButton'>
                        <Link className="add-event-link" to='/protected/new-event'> Add Event </Link>
                    </div>
                </Header>
                <Route path='/protected/new-event' component={newEvent} />
                <Menu vertical>
                    <Dropdown item text='Select Type'>
                        <Dropdown.Menu name='selectType' onChange={this.onChange} value={this.state.selectType}>
                            <Dropdown.Item text='all'>All</Dropdown.Item>
                            <Dropdown.Item text='birthday'>Birthday</Dropdown.Item>
                            <Dropdown.Item text='wedding'>Wedding</Dropdown.Item>
                            <Dropdown.Item text='anniversary'>Anniversary</Dropdown.Item>
                            <Dropdown.Item text='holiday'>Holiday</Dropdown.Item>
                            <Dropdown.Item text='party'>Party</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                <Card.Group itemsPerRow={4}>
                    {this.FilteredEvents(this.props.events).length === 0 &&
                        <Message error content={`There are no upcoming ${this.state.selectType}.charAt(0).toUpperCase()  ${this.state.selectType}.slice(1)}s`} />
                    }

                    {this.FilteredEvents(this.props.events).map(event => {
                        if (this.state.editingEventId === event.id) {
                            return (
                                <Card>
                                    <EditForm
                                        event={event}
                                        closeEdit={this.closeEdit}
                                    />
                                </Card>
                            );
                        }

                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{event.event}</Card.Header>
                                    <Card.Meta>{event.date}</Card.Meta>
                                    <Divider />
                                    <Card.Description>{event.description}</Card.Description>
                                    <Card.Meta>{event.messageDate}</Card.Meta>
                                    <Card.Description>{event.message}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon
                                        name='pencil'
                                        onClick={() => this.setState({ editingEventId: event.id })}

                                    />
                                    <Icon
                                        name='times'
                                        onClick={() => this.deleteEvent(event.id)}
                                    />
                                </Card.Content>
                            </Card>
                        )
                    })}

                </Card.Group>

            </Container>
        )
    }
}

const mapStateToProps = ({
    events,
    deleteEvent,
}) => ({
    events,
    deleteEvent,
});

export default connect(
    mapStateToProps,
    { deleteEvent, getData }
)(Main);