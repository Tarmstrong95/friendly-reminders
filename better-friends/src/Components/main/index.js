import React from 'react';
import NewEvent from './newEvent';
import { connect } from 'react-redux';

import { deleteEvent, editEvent, getData, saveEdit } from '../../Actions';

import EditForm from './EditForm';
import { Header, Container, Dropdown, Card, Message, Icon, Divider, Label, Button, Modal, Form, Input } from 'semantic-ui-react';


class Main extends React.Component {
    state = {
        editingEventId: null,
        selectType: 'All',
    };

    componentDidMount() {
        this.props.getData(this.props.id);
    }

    deleteEvent = id => {
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
        console.log(this.props.events)

        const { selectType } = this.state
        return (
            <Container >
                <Header as='h1'>
                    Events
                    <NewEvent />
                </Header>
                <span>
                    <Dropdown
                        floating
                        icon='filter'
                        compact
                        className='icon'
                        name='type'
                        text={selectType}
                        options={filters}
                        onChange={this.handleDropdown}
                        value={selectType}
                    />
                </span>
                <Divider />
                {(this.props.events && this.props.events.length>0) &&
                <Card.Group itemsPerRow={4} className='baseline'>
                    {!this.FilteredEvents(this.props.events) &&
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
                                    <Label attached='top' color={
                                        event.type ===
                                            'Birthday' ? 'red' :
                                            event.type === 'Wedding' ? 'pink' :
                                                event.type === 'Anniversary' ? 'violet' :
                                                    event.type === 'Holiday' ? 'blue' :
                                                        'olive'
                                    } />
                                    <Card.Header>{event.description}</Card.Header>
                                    <Card.Meta>{((date)=>{
                                        const newDate = new Date(date)
                                        return newDate.toDateString()
                                    })(event.date)}</Card.Meta>
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
}
{
    (!this.props.events || !this.props.events.length) && 
    <Label
    content='Try creating an event!'
    color='red'
    />
}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.events,
        id: state.user.id
    }
};

export default connect(
    mapStateToProps,
    { deleteEvent, getData }
)(Main);


export const filters = [
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