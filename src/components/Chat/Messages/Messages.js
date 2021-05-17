import React, { useState, useEffect } from 'react';
import { MessagesContainer, NoChannel, ButtonContainer, MessageInput, WriteMessage, NewMessage, MsgWindow, SearchInput, ChannelHeader, HeaderLeft, HeaderRight } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../styledComponents/FormStyled';
import Msg from './Msg';
import firebase from '../../../firebase';

const Messages = ({ currentChannel, currentUser }) => {

    const [message, setMessage] = useState({
        ref: firebase.database().ref('messages'),
        message: "",
        loading: false,
        errors: [],
        messagesLoading: true,
    });

    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        if (currentUser && currentChannel) {
            addListener(currentChannel.id);
        }
    }, [])

    const addListener = (channelId) => {
        addMessageListener(channelId)
    };

    const addMessageListener = (channelId) => {
        let loadedMessages = [];
        message.ref.child(channelId).on('child_added', snap => {

            loadedMessages.push(snap.val());
            setMessage({ ...message, messagesLoading: false })
            setMessages(loadedMessages)
        })
    }


    const handleChange = (event) => {
        console.log(event)
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

    const displayMessages = () => {
        return messages.length > 0 && messages.map((el) => {
            return (
                <Msg
                    key={el.timestamp}
                    message={el}
                    user={currentUser}
                ></Msg>
            )
        })
    }

    const checkifEnter = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }


    return (
        <MessagesContainer>
            <ChannelHeader>
                <HeaderRight>
                    {currentChannel ? <div> {currentChannel.name} <FontAwesomeIcon size='1x' icon={faStar} />
                    </div>
                        : null}
                    <div style={{ fontSize: '16px' }}>2 Users</div>
                </HeaderRight>
                <HeaderLeft>
                    <SearchInput placeholder='Search Messages' ></SearchInput><FontAwesomeIcon style={{ padding: '10px' }} size='1x' icon={faSearch} />
                </HeaderLeft>
            </ChannelHeader>
            {currentChannel === null ?
                <MsgWindow>
                    <NoChannel>
                        <img width='200px' height='200px' src='https://img-premium.flaticon.com/png/512/1355/1355890.png?token=exp=1621261244~hmac=e47ee724eca16d90020ca44f04b657ec' ></img>
                        <h2>
                            Welcome to DevChat <br />
                        </h2>
                    </NoChannel>
                </MsgWindow>
                :
                <MsgWindow>
                    {displayMessages()}
                </MsgWindow>
            }
            <NewMessage>
                <WriteMessage>
                    <MessageInput disabled={currentChannel === null} onKeyDown={checkifEnter} error={message.errors.includes('message')} onChange={handleChange} value={message.message} />
                </WriteMessage>
                <ButtonContainer>
                    <Button upload>Upload Media</Button>
                    <Button onClick={sendMessage} reply>Add Reply</Button>
                </ButtonContainer>
            </NewMessage>
        </MessagesContainer>
    )
}


export default Messages;