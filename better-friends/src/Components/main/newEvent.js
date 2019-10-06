import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../Actions';
import { Form, Button, Header, Container, Dropdown, Modal, Label, Input, TextArea } from 'semantic-ui-react';
import { filters as options } from './index'
import DatePicker from 'react-date-picker';

class NewEvent extends React.Component {
    state = {
        event: '',
        date: '',
        description: '',
        messageDate: '',
        message: '',
        type: 'Select a type'
    }

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
            newEvent: {
                ...this.state.new,
                [e.target.name]: value
            }
        });
    };

    handleDropdown = (e, { value }) => this.setState({ ...this.state, type: `${options[value].text}` })
    onChange = date => this.setState({ ...this.state, messageDate: date })

    addEvent = e => {
        e.preventDefault();
        this.props.addEvent(this.state)
        this.setState({
            new: {
                event: '',
                date: '',
                description: '',
                messageDate: '',
                message: ''
            }
        });
    };



    render() {
        return (
            <div>
                <Modal
                    size='mini'
                    closeIcon
                    trigger={<Button
                        content='Add Event'
                        icon='plus'
                        size='mini'
                        onClick={this.showAdd}
                    />}>
                    <Modal.Header>Add an event</Modal.Header>
                    <Modal.Content>
                        <Form>

                            <Form.Field>
                                <Label size='tiny'>What would you like to title this event?</Label>
                                <Input name='event' placeholder='Title' />
                            </Form.Field>

                            <Form.Field>
                                <Label size='tiny'>When is the event date?</Label>
                                <Input name='date' placeholder='Event Date' />
                            </Form.Field>

                            <Form.Field>
                                <Label size='tiny'>What type of event is this?</Label>
                                <div>
                                    <Dropdown
                                        text={this.state.type}
                                        options={options}
                                        scrolling
                                        onChange={this.handleDropdown}
                                    />
                                </div>
                            </Form.Field>

                            <Form.Field>
                                <Label size='tiny'>When would you like the message to be sent?</Label>
                                <div>
                                    <DatePicker onChange={this.onChange} value={this.state.messageDate} 
                                    
                                    />
                                </div>

                            </Form.Field>

                            <Form.Field>
                                <Label size='tiny'>Say something nice!</Label>
                                <TextArea name='message' placeholder='Message' />
                            </Form.Field>

                            <Button content='Save' onClick={this.addEvent} />

                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}



export default connect(null, { addEvent })(NewEvent);