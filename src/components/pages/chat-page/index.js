import React, { useState } from 'react';
import {Container, Typography, Card, Grid, FormControl, InputLabel, OutlinedInput, Button} from '@material-ui/core';

import { useBusinessMessages, useBusinessMessage } from '../../../services/business';

const ChatPage = () => {
    const [messages, getMessages] = useBusinessMessages();
    const [message, sendMessage] = useBusinessMessage();

    const [ text, setText ] = useState('');

    return (
        <Container className="chat-container">
            <Typography variant="h3">Сообщение</Typography>
            <Card className="chat-card">
                <Typography variant="h5">Бигмак</Typography>
                <Grid container direction='column' xs="12">    
                    <Grid item xs="10">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                /* startAdornment={<InputAdornment position="start">$</InputAdornment>} */
                                labelWidth={60}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs="2">
                        <Button variant="contained" color="primary" onClick={() => sendMessage(text)}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )

}

export default ChatPage;