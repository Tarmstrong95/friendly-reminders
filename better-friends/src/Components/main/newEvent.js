import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../Actions';
import { Form, Button, Header, Container, Dropdown } from 'semantic-ui-react';

class newEvent extends React.Component {
    state = {
        new: {
            event: '',
            date: '',
            description: '',
            messageDate: '',
            message: '',
            type: ''
        }
    };

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
            newEvent: {
                ...this.state.new,
                [e.target.name]: value
            }
        });
    };

    close = () => {
        this.props.history.push('/protected')
    }

    addEvent = e => {
        e.preventDefault();
        this.props.addEvent(this.state.new).then(() => {
            this.props.history.push('/protected')
        });
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
            <Container>
                <div>
                    <Button onClick={this.close}>X</Button>
                </div>
                <div>
                    <Header as='h4'>New Event</Header>
                </div>
                <Form className='form' onSubmit={this.addEvent}>
                    <Dropdown name='type'>
                        <Dropdown.Menu>
                            <Dropdown.item text='all'/>
                            <Dropdown.item text='birthday'/>
                            <Dropdown.item text='wedding'/>
                            <Dropdown.item text='anniversary'/>
                            <Dropdown.item text='holiday'/>
                            <Dropdown.item text='party'/>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Input
                        type='text'
                        name='event'
                        placeholder='Event'
                    />
                    <Form.Input
                        type='text'
                        name='date'
                        placeholder='Date'
                    />

                    <Form.Input
                        type='text'
                        name='messageDate'
                        placeholder='Send Date'
                    />
                    <Form.TextArea
                        type='text'
                        rows='3'
                        name='Description'
                        placeholder='Description'
                    />
                    <Form.TextArea
                        type='text'
                        name='message'
                        placeholder='Message'
                        rows='3'
                    />
                    <Button>Add</Button>
                </Form>
            </Container>
        )
    }
}



export default connect(null, { addEvent })(newEvent);