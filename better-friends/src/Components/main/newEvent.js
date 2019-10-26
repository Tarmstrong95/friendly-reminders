import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../Actions';
import { Form, Button, Header, Container, Dropdown, Modal, Label, Input, TextArea } from 'semantic-ui-react';
import { filters as options } from './index'
import DatePicker from 'react-date-picker';

class NewEvent extends React.Component {
    state = {
        date: '',
        description: '',
        messagedate: '',
        message: '',
        type: 'Select a type'
    }

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
                ...this.state.new,
                [e.target.name]: value
        });
    };

    handleDropdown = (e, { value }) => this.setState({ ...this.state, type: `${options[value].text}` })
    onChangeDate = date => this.setState({ ...this.state, date })
    onChangeMessDate = date => this.setState({ ...this.state, messagedate: date })

    addEvent = e => {
        e.preventDefault();
        this.props.addEvent({...this.state, user: this.props.userid})
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
                    <Modal.Header>Add an reminder</Modal.Header>
                    <Modal.Content>
                        <Form>

                            <Form.Field>
                                <Input 
                                name='description' 
                                placeholder='Title' 
                                onChange={this.handleChanges}
                                />
                            </Form.Field>

                            <Form.Field inline>
                                <Label pointing='right' basic color='red' size='tiny'>Date of event</Label>
                                <DatePicker 
                                name='date' 
                                onChange={this.onChangeDate} 
                                value={this.state.date} />
                            </Form.Field>

                            <Form.Field>
                                <div>
                                    <Dropdown
                                        text={this.state.type}
                                        options={options}
                                        scrolling
                                        value={this.state.value}
                                        onChange={this.handleDropdown}
                                    />
                                </div>
                            </Form.Field>

                            <Form.Field inline>
                                <Label pointing='right' basic color='red' size='tiny'>Date to send</Label>
                                <DatePicker 
                                name='messagedate' 
                                onChange={this.onChangeMessDate} 
                                value={this.state.messagedate} />
                            </Form.Field>

                            <Form.Field>
                                <TextArea 
                                name='message' 
                                placeholder='Message' 
                                value={this.state.message}
                                onChange={this.handleChanges}
                                />
                            </Form.Field>

                            <Button content='Save' onClick={this.addEvent} />

                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userid: state.user.id
    }
}


export default connect(mapStateToProps, { addEvent })(NewEvent);