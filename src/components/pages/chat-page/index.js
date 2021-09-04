import React, { useState, useEffect } from 'react';
import {Container, Typography, Card, Grid, FormControl, InputLabel, OutlinedInput, Button} from '@material-ui/core';
import { useParams } from "react-router-dom";

import { useBusinessMessages, useBusinessMessage, useBusiness } from '../../../services/business';
import './style.css';

const Message = ({title, text, role}) => {
    const color = role === 'AIRPORT' ? 'primary': null;
    const messageTitle = role === 'AIRPORT' ? title: 'Аэропорт';

    return (
        <div className="message">
            <Typography color={color} variant="body1">{messageTitle}</Typography>
            <Typography variant="body1">{text}</Typography>
        </div>
    );
}; 

const ChatPage = () => {
    const [messages, getMessages] = useBusinessMessages();
    const [message, sendMessage] = useBusinessMessage();
    const [bisiness, getBusiness] = useBusiness();

    const [text, setText] = useState('');
    let {id} = useParams();

    useEffect(() => {
        getBusiness(id);
        getMessages(id);
    }, [id]);

    if (!bisiness || !messages) {
        return <div></div>
    }

    return (
        <Container className="chat-container">
            <Typography variant="h3">Сообщения</Typography>
            <Card className="chat-card">
                <Typography variant="h5">{bisiness.title}</Typography>

                <Grid container className="messages-grid" direction='column' xs="12">
                    {
                        messages.map((msg) => {
                            const {id, text, role} = msg;
                            return <Message key={id} role={role} title={bisiness.title} text={text}/>
                        })
                    }
                </Grid>

                <Grid container className="chat-grid" direction='column' xs="12">    
                    <Grid item xs="10">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Сообщение</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-amount"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                /* startAdornment={<InputAdornment position="start">$</InputAdornment>} */
                                labelWidth={60}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs="2">
                        <Button style={{marginLeft: '1em', minHeight: '4em', minWidth: '7em'}} variant="contained" color="primary" onClick={() => sendMessage(text)}>
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )

}

export default ChatPage;