import React, { useState, useEffect } from 'react';
import { MessagesContainer, ButtonContainer, MessageInput, WriteMessage, NewMessage, Divider, SearchInput, ChannelHeader, HeaderLeft, HeaderRight } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../styledComponents/FormStyled';
import firebase from '../../../firebase';

const Messages = ({ currentChannel, currentUser }) => {

    useEffect(() => {

        if (currentUser && currentChannel) {
            addListener(currentChannel.id);
        }
    }, [])

    const addListener = () => {

    };

    const [message, setMessage] = useState({
        ref: firebase.database().ref('messages'),
        message: "",
        loading: false,
        errors: []
    });

    const handleChange = (event) => {
        setMessage({ ...message, message: event.target.value })
    };

    const createMessage = () => {
        let messageObj = {
            content: message.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUser?.uid,
                name: currentUser?.displayName,
                avatar: currentUser?.photoURL
            }
        };
        return messageObj;
    };

    const sendMessage = () => {
        if (message.message) {
            setMessage({ ...message, loading: true })
            message.ref
                .child(currentChannel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setMessage({ ...message, loading: false, message: '', errors: [] })
                })
                .catch(error => {
                    setMessage({ ...message, loading: false, errors: message.errors.concat(error) })
                })
        }
        else {
            setMessage({ ...message, errors: message.errors.concat("Add a message") })
        }
    };


    return (
        <MessagesContainer>
            <ChannelHeader>
                <HeaderRight>
                    <div>
                        Channel<FontAwesomeIcon size='1x' icon={faStar} />
                    </div>
                    <div style={{ fontSize: '14px' }}>2 Users</div>
                </HeaderRight>
                <HeaderLeft>
                    <SearchInput placeholder='Search Messages' ></SearchInput><FontAwesomeIcon style={{ padding: '10px' }} size='1x' icon={faSearch} />
                </HeaderLeft>
            </ChannelHeader>
            <Divider />
            <NewMessage>
                <WriteMessage>
                    <MessageInput error={message.errors.includes('message')} onChange={handleChange} value={message.message} />
                    <button onClick={sendMessage} >
                        <FontAwesomeIcon style={{ padding: '10px' }} size='1x' icon={faPlus} />
                    </button>
                </WriteMessage>
                <ButtonContainer>
                    <Button reply>Add Reply</Button>
                    <Button upload>Upload Media</Button>
                </ButtonContainer>
            </NewMessage>
        </MessagesContainer>
    )
}


export default Messages;