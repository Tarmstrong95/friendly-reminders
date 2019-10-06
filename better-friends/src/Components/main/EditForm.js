import React from 'react';
import { Card, Button, Header, Form, Label, Segment, Divider, Icon, Input, TextArea, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { editEvent, resetEdit } from '../../Actions/index'

class EditForm extends React.Component {
    state = {
        event: this.props.event
    }

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
            event: {
                ...this.state.event,
                [e.target.name]: value
            }
        });
    };
    handleDropdown = (e, { value }) => this.setState({
        ...this.state,
        description: `${value ? eventOptions[value].text : 'Please select a type'}`
    })

    editEvent = e => {
        this.props.editEvent(e, this.state.event)
    }

    closeEdit = () => {
        this.props.closeEdit();
    }
    componentDidMount = () => {
        const { event, message, description, date, id, messageDate } = this.state.event
        this.setState({
            event: { event, message, description, date, id, messageDate }
        })
    }



    render() {
        const { event, message, description, date, id, messageDate, value } = this.state.event
        const { editingEvent, editingEventFail, editingEventSuccess, closeEdit } = this.props
        return (
            <Card>
                <Card.Content textAlign='left'>
                    <Form>
                        <Card.Header>
                            <Input
                                transparent
                                type='text'
                                name='event'
                                placeholder='Event'
                                value={event}
                                onChange={this.handleChanges}
                            />
                            <Divider />
                        </Card.Header>
                        <Card.Meta>
                            <Input
                                type='text'
                                name='date'
                                placeholder='Date'
                                value={date}
                                onChange={this.handleChanges}
                                transparent
                            />
                        </Card.Meta>
                        <Divider />
                        <Card.Description>
                            <Dropdown
                                clearable
                                name='description'
                                placeholder={description}
                                selection
                                options={eventOptions}
                                onChange={this.handleDropdown}
                                value={value}
                            />
                            <Divider />
                        </Card.Description>
                        <Card.Meta>
                            <Input
                                type='text'
                                name='messageDate'
                                placeholder='Send Date'
                                value={messageDate}
                                onChange={this.handleChanges}
                                transparent
                            />
                            <Divider />
                        </Card.Meta>
                        <Card.Description>
                            <TextArea
                                type='text'
                                name='message'
                                placeholder='Message'
                                rows='3'
                                value={message}
                                onChange={this.handleChanges}
                            />
                            <Divider />
                        </Card.Description>
                    </Form>

                </Card.Content>
                <Card.Content extra>
                    {!editingEvent &&
                        !editingEventFail &&
                        !editingEventSuccess &&
                        <Icon
                            name='check circle'
                            onClick={() => this.editEvent(this.state.event)}
                        />}
                    {editingEventSuccess && <Icon
                        name='check circle'
                        color='green'
                        onClick={() => this.editEvent(this.state.event)}
                    />}
                    {editingEventFail &&
                        !editingEvent
                        && <Icon
                            name='check circle'
                            color='red'
                            onClick={() => this.editEvent(this.state.event)}
                        />}
                    {editingEvent &&
                        !editingEventFail &&
                        !editingEventSuccess
                        && <Icon
                            loading
                            name='spinner'
                        />}
                    <Icon
                        name='times'
                        onClick={() => {
                            resetEdit()
                            closeEdit()
                        }}
                    />
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    editingEvent: state.editingEvent,
    editingEventFail: state.editingEventFail,
    editingEventSuccess: state.editingEventSuccess
})

export default connect(mapStateToProps, { editEvent, resetEdit })(EditForm);


const eventOptions = [
    {
        key: 0,
        text: 'Birthday',
        value: 0
    },
    {
        key: 1,
        text: 'Wedding',
        value: 1
    },
    {
        key: 2,
        text: 'Anniversery',
        value: 2
    },
    {
        key: 3,
        text: 'Holiday',
        value: 3
    },
    {
        key: 4,
        text: 'Party',
        value: 4
    },
    {
        key: 5,
        text: 'Graduation',
        value: 5
    },
]