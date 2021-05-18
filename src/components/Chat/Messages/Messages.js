import React, { useState, useCallback, useEffect } from 'react';
import { MessagesContainer, NoChannel, ButtonContainer, MessageInput, WriteMessage, NewMessage, MsgWindow, SearchInput, ChannelHeader, HeaderLeft, HeaderRight } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../styledComponents/FormStyled';
import Msg from './Msg';
import FileModal from './FileModal';
import firebase from '../../../firebase';
import Modal from 'react-modal';
import { v4 as uuid } from 'uuid';


const customStyles = {
    content: {
        backgroundColor: '#FAFAFA',
        border: 'none',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        flexDirection: 'column',
        display: 'flex'
    }
};

const Messages = ({ currentChannel, currentUser }) => {

    const [message, setMessage] = useState({
        ref: firebase.database().ref('messages'),
        message: "",
        loading: false,
        errors: [],
        messagesLoading: true,
    });
    const [percentUplouded, setPercentUplouded] = useState(0);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('')
    const [storageRef, setStorageRef] = useState(firebase.storage().ref())
    const [uploudTask, setUploadTask] = useState(null);
    const [uploudState, setUploadState] = useState('')
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const onDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
        setMessage({ ...message, message: acceptedFiles[0].name })
        const filePath = `chat/public/${uuid()}.jpg`;
        setUploadState('uplouding');
        setUploadTask(storageRef.child(filePath).put(acceptedFiles[0]));
    };

    const next = useCallback(

        () => {
            console.log('onsend uploudtask' + uploudTask)

            const pathToUpload = currentChannel.id;
            const reference = message.ref;
            uploudTask.snapshot.ref.getDownloadURL()
                .then(downloadUrl => {
                    sendFileMessage(downloadUrl, reference, pathToUpload)
                })
                .catch(err => console.log(err))
        },
        [uploudTask],
    )

    const onSend = () => {
        closeModal(true)
        console.log(percentUplouded + 'ileee')
        uploudTask.on('state_changed', snap => {
            const percents = Math.round((snap.bytesTransfered / snap.totalBytes) * 100);
            setPercentUplouded(percents);
        });
        next();
    }


    useEffect(() => {
        if (currentUser && currentChannel) {
            addListener(currentChannel.id);
        }
    }, [fileName, file, message.message])

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
        setMessage({ ...message, message: event.target.value })
    };

    const createMessage = (fileUrl = null) => {
        let messageObj = {
            content: message.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUser?.uid,
                name: currentUser?.displayName,
                avatar: currentUser?.photoURL
            }
        };

        if (fileUrl !== null) {
            messageObj['image'] = fileUrl;
        } else {
            messageObj['content'] = message.message;
        }

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

    const clearFile = () => {
        setFile(null)
        setFileName("")
    }


    const sendFileMessage = (downloadUrl, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(createMessage(downloadUrl))
            .then(() => {
                setUploadState('done')
                console.log('wpada')
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <MessagesContainer>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="uploadMedia"
            >
                <FileModal onSend={onSend} clearFile={clearFile} fileName={fileName} closeModal={closeModal} onDrop={onDrop} />
            </Modal>
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
                    <Button onClick={openModal} upload>Upload Media</Button>
                    <Button onClick={sendMessage} reply>Add Reply</Button>
                </ButtonContainer>
            </NewMessage>
        </MessagesContainer>
    )
}


export default Messages;