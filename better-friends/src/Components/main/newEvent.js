import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../Actions';
import { Form, Button, Header, Container, Dropdown, Modal, Label, Input, TextArea } from 'semantic-ui-react';
import { filters as options } from './index'
import DatePicker from 'react-date-picker';
import './index.css'

class NewEvent extends React.Component {
    state = {
        date: '',
        dm: '',
        dd: '',
        dy: '',
        description: '',
        messagedate: '',
        m: '',
        d: '',
        y: '',
        message: '',
        type: 'Select a type',
        email: ''
    }

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    };

    handleDropdown = (e, { value }) => this.setState({ ...this.state, type: `${options[value].text}` })

    addEvent = e => {
        const { email, description, message, type } = this.state,
            date = new Date(this.state.dy, this.state.dm - 1, this.state.dd),
            messagedate = new Date(this.state.y, this.state.m - 1, this.state.d)

        e.preventDefault();

        this.props.addEvent({
            date: date.toDateString(),
            description,
            message,
            email,
            type,
            messagedate: messagedate.toDateString(),
            user: this.props.userid
        })
    };



    render() {
        console.log(this.state)
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
                                <form className='dateForm'>{'Event: '}
                                    <input
                                        name='dm'
                                        placeholder='MM'
                                        type='number'
                                        min='1' max='12'
                                        className='dateInput'
                                        value={this.state.dm}
                                        onChange={this.handleChanges}
                                    />{'/'}
                                    <input
                                        name='dd'
                                        placeholder='DD'
                                        type='number'
                                        min='1' max='31'
                                        className='dateInput'
                                        value={this.state.dd}
                                        onChange={this.handleChanges}
                                    />{'/'}
                                    <input
                                        name='dy'
                                        placeholder='YYYY'
                                        type='text'
                                        minLength='4'
                                        maxLength='4'
                                        className='dateInput maxfour'
                                        value={this.state.dy}
                                        onChange={this.handleChanges}
                                    />
                                </form>
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
                                <form className='dateForm'>{'Send: '}
                                    <input
                                        name='m'
                                        placeholder='MM'
                                        type='number'
                                        min='1' max='12'
                                        className='dateInput'
                                        value={this.state.m}
                                        onChange={this.handleChanges}
                                    />{'/'}
                                    <input
                                        name='d'
                                        placeholder='DD'
                                        type='number'
                                        min='1' max='31'
                                        className='dateInput'
                                        value={this.state.d}
                                        onChange={this.handleChanges}
                                    />{'/'}
                                    <input
                                        name='y'
                                        placeholder='YYYY'
                                        type='text'
                                        minLength='4'
                                        maxLength='4'
                                        className='dateInput maxfour'
                                        value={this.state.y}
                                        onChange={this.handleChanges}
                                    />
                                </form>
                            </Form.Field>

                            <Form.Field>
                                <Input
                                name='email'
                                placeholder='Email of ricipient'
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChanges}
                                />
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