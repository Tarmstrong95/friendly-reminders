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
        selectType: 'All',
        place: 'plachoeler'
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
        if (this.state.selectType === 'All') {
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

    handleDropdown = (e, { value }) => this.setState({
        ...this.state,
        selectType: `${value ? filters[value].text : 'All'}`
    })



    render() {
        const { selectType, place } = this.state
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
                    <Dropdown
                        clearable
                        item
                        name='type'
                        placeholder={place}
                        selection
                        options={filters}
                        onChange={this.handleDropdown}
                        value={selectType}
                    />
                </Menu>
                <Card.Group itemsPerRow={4} className='baseline'>
                    {this.FilteredEvents(this.props.events).length === 0 &&
                        <Message error content={`There are no upcoming ${this.state.selectType}s`} />
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
                                    <Card.Description>{event.type}</Card.Description>
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


const filters = [
    {
        key: 0,
        value: 0,
        text: 'All'
    },
    {
        key: 1,
        value: 1,
        text: 'Birthday'
    },
    {
        key: 2,
        value: 2,
        text: 'Wedding'
    },
    {
        key: 3,
        value: 3,
        text: 'Anniversary'
    },
    {
        key: 4,
        value: 4,
        text: 'Holiday'
    },
    {
        key: 5,
        value: 5,
        text: 'Party'
    },
]