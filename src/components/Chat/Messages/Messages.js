import React, { useState, useCallback, useEffect } from 'react';
import { MessagesContainer, NoChannel, ButtonContainer, MessageInput, WriteMessage, NewMessage, MsgWindow, SearchInput, ChannelHeader, HeaderLeft, HeaderRight } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch, faAt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../styledComponents/FormStyled';
import Msg from './Msg';
import FileModal from './FileModal';
import firebase from '../../../firebase';
import Modal from 'react-modal';
import { v4 as uuid } from 'uuid';
import LoadingPage from '../../Spinner/Spinner';
import { connect } from 'react-redux';
import { setUserPosts } from '../../../redux/actions';

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

const Messages = ({ addToStared, currentChannel, currentUser, isPrivateChannel, setUserPosts }) => {

    const [message, setMessage] = useState({
        ref: firebase.database().ref('messages'),
        message: "",
        loading: false,
        errors: [],
        messagesLoading: true,
    });
    const [privateMessagesRef] = useState(firebase.database().ref('privateMessages'),)
    const [isPrivate] = useState(isPrivateChannel);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('')
    const [storageRef] = useState(firebase.storage().ref())
    const [uploudTask, setUploadTask] = useState(null);
    const [uploudState, setUploadState] = useState('')
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState('');
    const [messageSearch, setMessageSearch] = useState('');
    const [searchList, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const getPath = () => {
        return isPrivateChannel ? 'chat/public' : `chat/private-${currentChannel.id}`
    }

    const getMessagesRef = () => {
        return isPrivate ? privateMessagesRef : message.ref;
    }

    const onDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
        setMessage({ ...message, message: acceptedFiles[0].name })
        const filePath = `${getPath()}/${uuid()}.jpg`;
        setUploadState('uplouding');
        setUploadTask(storageRef.child(filePath).put(acceptedFiles[0]));
        setMessage({ ...message, loading: true })
    };

    const next = useCallback(

        () => {
            const pathToUpload = currentChannel.id;
            const reference = getMessagesRef();
            uploudTask.snapshot.ref.getDownloadURL()
                .then(downloadUrl => {
                    sendFileMessage(downloadUrl, reference, pathToUpload)
                })
                .catch(err => { })
        },
        [uploudTask],
    )

    const onSend = () => {
        closeModal(true)
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

    useEffect(() => {
        handleSearchMessages();
    }, [messageSearch])

    const addMessageListener = (channelId) => {
        let loadedMessages = [];
        const ref = getMessagesRef();
        ref.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            setMessage({ ...message, messagesLoading: false })
            setMessages(loadedMessages)
            countUniqueUsers(loadedMessages)
        })
        countUserPosts(loadedMessages);
    }

    const countUserPosts = (messages) => {
        const userPosts = messages.reduce((acc, message) => {
            if (message.user.name in acc) {
                acc[message.user.name].count += 1
            }
            else {
                acc[message.user.name] = {
                    avatar: message.user.avatar,
                    count: 1
                }
            }
            return acc;
        }, {})
        setUserPosts(userPosts)
    }

    const countUniqueUsers = (messages) => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name)
            }
            return acc;
        }, [])
        const numUniqueUsers = `${uniqueUsers.length} User${uniqueUsers.length === 1 ? "" : "s"}`
        setUsers(numUniqueUsers)
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

    const displayMessages = (prop) => {
        return prop.length > 0 && prop.map((el) => {
            return (
                <Msg
                    key={el.timestamp}
                    message={el}
                    user={el.user.name}
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
                setMessage({ ...message, loading: false })
            })
            .catch(error => {
            })
    }


    const onMessageSearch = (e) => {
        setMessageSearch(e.target.value);
        setSearchLoading(true);
    }


    const handleSearchMessages = () => {
        const channelMessages = [...messages];
        const regex = new RegExp(messageSearch, 'gi');
        const searchResult = channelMessages.reduce((acc, message) => {
            if (message.content && message.content.match(regex) || message.user.name.match(regex)) {
                acc.push(message)
            }
            return acc;
        }, [])
        setSearchResult(searchResult)
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
                    {currentChannel ? <div> <FontAwesomeIcon onClick={addToStared} size='1x' icon={isPrivate ? faAt : faStar} /> {currentChannel.name}
                        <div style={{ fontSize: '16px' }}>{users}</div>
                    </div>
                        : null}
                </HeaderRight>
                <HeaderLeft>
                    <SearchInput onChange={onMessageSearch} placeholder='Search...' ></SearchInput><FontAwesomeIcon style={{ padding: '10px' }} size='1x' icon={faSearch} />
                </HeaderLeft>
            </ChannelHeader>
            {currentChannel === null ?
                <MsgWindow>
                    <NoChannel>
                        <img width='200px' height='200px' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0MyN0I0ODsiIGQ9Ik01MTIsMzc2YzAsOC4zOTktNi41OTksMTUtMTUsMTVIMTk2Yy04LjQwMSwwLTE1LTYuNjAxLTE1LTE1YzAtOC40MDEsNi41OTktMTUsMTUtMTVoMjAwLjcNCglsMjUuOC01MS42MDFjMy45LTcuNSwxMi45LTEwLjQ5OSwyMC4wOTktNi44OTljNy41LDMuOSwxMC41MDEsMTIuOSw2LjkwMSwyMC4wOTlMNDMwLjMsMzYxSDQ5N0M1MDUuNDAxLDM2MSw1MTIsMzY3LjU5OSw1MTIsMzc2eiINCgkvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0E2NjIzNTsiIGQ9Ik01MTIsMzc2YzAsOC4zOTktNi41OTksMTUtMTUsMTVIMjU2di0zMGgxNDAuN2wyNS44LTUxLjYwMWMzLjktNy41LDEyLjktMTAuNDk5LDIwLjA5OS02Ljg5OQ0KCWM3LjUsMy45LDEwLjUwMSwxMi45LDYuOTAxLDIwLjA5OUw0MzAuMywzNjFINDk3QzUwNS40MDEsMzYxLDUxMiwzNjcuNTk5LDUxMiwzNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojODA1MTQyOyIgZD0iTTMxNiwxODBjLTguMjkxLDAtMTUtNi43MDktMTUtMTV2LTYwYzAtOC4yOTEsNi43MDktMTUsMTUtMTVoNjBjOC4yOTEsMCwxNSw2LjcwOSwxNSwxNQ0KCUMzOTEsMTQ2LjM1MywzNTcuMzUzLDE4MCwzMTYsMTgweiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0MyN0I0ODsiIGQ9Ik0zMzEsMS4xOTljMCwwLTE1LDEwLjgtMzAsMjEuNjAxVjEwNWMwLDguMzk5LDYuNTk5LDE1LDE1LDE1aDkwYzguNDAxLDAsMTUtNi42MDEsMTUtMTUNCglDNDIxLDUyLjIsMzgxLjcsOC4zOTksMzMxLDEuMTk5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzEwQkI2NzsiIGQ9Ik0zMTYsMGgtNzVjLTY2LjMwMSwwLTEyMCw1My42OTktMTIwLDEyMHYyNTZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWg5MGMxMC40OTksMCwyMC40LTEuNSwzMC00LjUwMQ0KCWM0My4yLTEyLjksNzUtNTMuMTAxLDc1LTEwMC40OTlWMS4xOTlDMzI2LjIwMSwwLjMsMzIxLjA5OSwwLDMxNiwweiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzBDQTY1NjsiIGQ9Ik0zMzEsMS4xOTlWMjg2YzAsNDcuMzk5LTMxLjgsODcuNTk5LTc1LDEwMC40OTlWMGg2MEMzMjEuMDk5LDAsMzI2LjIwMSwwLjMsMzMxLDEuMTk5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzU3NTU1QzsiIGQ9Ik0yNzEsNzVjMCw4LjM5OS02LjU5OSwxNS0xNSwxNXMtMTUtNi42MDEtMTUtMTVjMC04LjQwMSw2LjU5OS0xNSwxNS0xNVMyNzEsNjYuNTk5LDI3MSw3NXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzMkQ3MzY7IiBkPSJNMTgxLDE4Mi41Yy0yOS43LDYtNTMuMTAxLDI5LjctNTguODAxLDU5LjdjLTMwLjI5OCw1LjctNTQuMywyOS43LTYwLDYwDQoJQzYxLjMsMzA2LjcsNjEsMzExLjE5OSw2MSwzMTZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWg2My4zYzM5LjYsMCw3MS43LTMyLjEsNzEuNy03MS43di00NC43QzE5Ny41LDIwMC43OTksMTgxLDE4Mi41LDE4MSwxODIuNXoiDQoJLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRUE4MzI7IiBkPSJNMTM2LDUxMmMtNDEuMzUzLDAtNzUtMzMuNjQ3LTc1LTc1di02MGMwLTguMjkxLDYuNzA5LTE1LDE1LTE1aDYwYzguMjkxLDAsMTUsNi43MDksMTUsMTV2MTIwDQoJQzE1MSw1MDUuMjkxLDE0NC4yOTEsNTEyLDEzNiw1MTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkY0NjhDOyIgZD0iTTE5Niw0ODJjLTQxLjM1MywwLTc1LTMzLjY0Ny03NS03NXYtMzBjMC04LjI5MSw2LjcwOS0xNSwxNS0xNWg2MGM4LjI5MSwwLDE1LDYuNzA5LDE1LDE1djkwDQoJQzIxMSw0NzUuMjkxLDIwNC4yOTEsNDgyLDE5Niw0ODJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0MzQTQxOyIgZD0iTTI3MSw3NWMwLDguMzk5LTYuNTk5LDE1LTE1LDE1VjYwQzI2NC40MDEsNjAsMjcxLDY2LjU5OSwyNzEsNzV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNjFERTU2OyIgZD0iTTI1NiwyMTIuOGMtMTMuMi0xOS4yLTM0Ljc5OS0zMS44LTYwLTMxLjhjLTUuMDk5LDAtMTAuMjAxLDAuNTk5LTE1LDEuNXY3Ni44DQoJYzAsMjMuMTAxLTE4LjYsNDEuNy00MS43LDQxLjdINzZjLTQuNzk5LDAtOS4zLDAuMy0xMy44MDEsMS4xOTlDMjcuNCwzMDguOCwwLDMzOS4zOTksMCwzNzZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWgxMjQuMw0KCWM1MC43LDAsOTQuODAxLTI4LjgwMSwxMTYuNy03MC44YzkuNi0xOC4zMDEsMTUtMzkuMDAxLDE1LTYwLjkwMUMyNzEsMjQyLjE5OSwyNjUuNiwyMjYsMjU2LDIxMi44eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" ></img>
                        <h2>
                            Welcome to DevChat <br />
                        </h2>
                    </NoChannel>
                </MsgWindow>
                :
                <MsgWindow>
                    {messageSearch ? displayMessages(searchList) : displayMessages(messages)}
                    {message.loading ? <LoadingPage /> : null}
                </MsgWindow>
            }
            <NewMessage>
                <WriteMessage>
                    <MessageInput disabled={currentChannel === null} onKeyDown={checkifEnter} error={message.errors.includes('message')} onChange={handleChange} value={message.message} />
                </WriteMessage>
                <ButtonContainer>
                    <Button disabled={currentChannel === null || uploudState === 'uplouding'} onClick={openModal} upload>Upload Media</Button>
                    <Button disabled={currentChannel === null || uploudState === 'uplouding'} onClick={sendMessage} reply>Add Reply</Button>
                </ButtonContainer>
            </NewMessage>
        </MessagesContainer>
    )
}


export default connect(null, { setUserPosts })(Messages);