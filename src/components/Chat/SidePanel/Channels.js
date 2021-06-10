import React, { useState, useEffect, useRef } from 'react';
import { ChannelsContainer, AddIcon, Channel, ScrollChannels, ChannelDiv, Notification } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faPlus, faCheck, faTimes, faHashtag, faEnvelope, faDotCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, FormHeader, FormInput, TextArea } from "../../../styledComponents/FormStyled"
import firebase from '../../../firebase';
import { setCurrentChannel, setPrivateChannel } from '../../../redux/actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import LeftPanel from './UserSettings';

const Channels = ({ currentUser, currentChannel, setCurrentChannel, setPrivateChannel }) => {

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
    const [modal, setModal] = useState(false);
    const [ChannelList, setChannelList] = useState([]);
    const [UserList, setUserList] = useState([]);
    const [activeChannel, setActiveChannel] = useState('');
    const [activeUserChannel, setActiveUserChannel] = useState('');
    const [tabs, setOpenTabs] = useState({ channels: false, direct: false })
    const [usersRef] = useState(firebase.database().ref('users'))
    const [connectedRef] = useState(firebase.database().ref('.info/connected'))
    const [presenceRef] = useState(firebase.database().ref('presence'))
    const [channel, setChannel] = useState({
        name: '',
        info: '',
        ref: firebase.database().ref('channels')
    });
    const [channelWithNotification, setChannelNotification] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [messagesRef] = useState(firebase.database().ref('messages'));

    useEffect(() => {
        if (!!currentUser) {
            addUserListerner();
            addChannelListener();
        }
        return () => {
            removeChannelListener();
            removeUserListener();
            setCurrentChannel('');
            setActiveChannel('');
            setPrivateChannel(false)
        }
    }, [currentUser]);

    const addChannelListener = () => {
        let loadedChannels = [];
        channel.ref
            .on('child_added', snap => {
                loadedChannels.push(snap.val());
                setChannelList([...loadedChannels]);
            })
        if (ChannelList.length > 0) {
            changeChannel(ChannelList[0])
        }
    }

    const removeChannelListener = () => {
        channel.ref.off();
    }


    const addUserListerner = () => {
        let loadedUsers = [];
        usersRef
            .on('child_added', snap => {
                if (currentUser.uid !== snap.key) {
                    let user = snap.val()
                    user['uid'] = snap.key;
                    user['status'] = 'offline'
                    loadedUsers.push(user);
                    setUserList([...loadedUsers]);
                }
            })
        connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = presenceRef.child(currentUser.uid);
                ref.set(true);
                ref.onDisconnect().remove(error => {
                    if (error !== null) {

                    }
                })
            }
        })
        presenceRef.on('child_added', snap => {
            if (currentUser.uid !== snap.key) {
                addStatusToUser(snap.key)
            }
        });
        presenceRef.on('child_removed', snap => {
            if (currentUser.id !== snap.key) {
                addStatusToUser(snap.key, false)
            }
        })
    }

    const removeUserListener = () => {
        usersRef.off();
    }


    const addStatusToUser = (userId, connected = true) => {
        const updatedUser = UserList.reduce((acc, currentUser) => {
            if (currentUser.id === userId) {
                currentUser['status'] = `${connected ? 'online' : 'offline'}`
            }
            return acc.concat(currentUser);
        }, []);
        setUserList(updatedUser);
    }



    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const handleChange = (event, name) => {
        if (name === 'name') setChannel({ ...channel, name: event.target.value })
        if (name === 'info') setChannel({ ...channel, info: event.target.value })
    }


    const addChannel = () => {
        const key = channel.ref.push().key;

        let newChannel = {
            id: key,
            name: channel.name,
            info: channel.info,
            createdBy: {
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            }
        };

        channel.ref
            .child(key)
            .update(newChannel)
            .then(() => {
                closeModal();
                setChannel({ ...channel, name: "", info: "" });
            })
            .catch((error) => {
            })

    }



    const onSubmit = (event) => {
        event.preventDefault();
        if (channel.name === '' || channel.info === '') {
            return
        } else addChannel();
    }

    const isUserOnline = (prop) => {
        return prop === 'online' ? "green" : "red"
    }



    const getChannelId = (userId) => {
        const currentUserId = currentUser.uid;
        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`
    }


    const getNotificationCount = (channel) => {
        let count = 0;
        notifications.forEach(el => {
            if (el.id === currentChannel.id) {
                count = el.count
            }
        });
        if (count > 0) return count;
    }

    const displayChannels = () => {
        return ChannelList.length > 0 && ChannelList.map((el) => {
            return (
                <Channel active={el.id === activeChannel} key={el.id} onClick={() => changeChannel(el)} name={el.name} ><FontAwesomeIcon size='1x' style={{ marginRight: '5px' }} icon={faHashtag} />{el.name}{getNotificationCount(el) && <Notification>{getNotificationCount(el)}</Notification>}</Channel>
            )
        })
    };

    const displayUsers = () => {
        return UserList?.length > 0 && UserList?.map((el) => {
            return (
                <Channel active={el.id === activeUserChannel} key={el.id} onClick={() => changeUserChannel(el)} ><FontAwesomeIcon size='1x' style={{ marginRight: '5px' }} color={isUserOnline(el.status)} icon={faDotCircle} />{el.name} </Channel>
            )
        })
    };



    const changeChannel = (channelProp) => {
        setActiveChannel(channelProp.id);
        setCurrentChannel(channelProp);
        setPrivateChannel(false);
        setActiveUserChannel('');
        setChannelNotification(channelProp);
        clearNotifications();
    }

    const changeUserChannel = (clickedUser) => {
        const channelId = getChannelId(clickedUser.uid)
        const channelData = {
            id: channelId,
            name: clickedUser.name
        }
        setPrivateChannel(true);
        setCurrentChannel(channelData);
        setActiveUserChannel(channelData.id);
        setActiveChannel('')
    }


    const openTabs = (prop) => {
        if (prop === 'channels') { setOpenTabs({ ...tabs, channels: !tabs.channels }) }
        if (prop === 'direct') { setOpenTabs({ ...tabs, direct: !tabs.direct }) }
    }

    const clearNotifications = () => {
        let index = notifications.findIndex(notification => notification.id === currentChannel.id)

        if (index !== -1) {
            let updatedNotifications = [...notifications];
            updatedNotifications[index].total = notifications[index].lastKnownTotal;
            updatedNotifications[index].count = 0;
            setNotifications(updatedNotifications);
        } else {

        }
    }



    return (
        <ScrollChannels>
            <ChannelsContainer onClick={() => openTabs('channels')} ><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faExchangeAlt} />CHANNELS<p style={{ marginLeft: '5px' }} >({ChannelList.length})</p><AddIcon onClick={openModal} ><FontAwesomeIcon icon={faPlus} /></AddIcon ></ChannelsContainer>
            {tabs.channels &&
                <ChannelDiv >
                    {displayChannels()}
                </ChannelDiv>
            }
            <Modal
                appElement={document.getElementById('root')}
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="addChannelModal"
            >
                <FormHeader>Add a Channel</FormHeader>
                <h3>Channel's Name</h3>
                <FormInput maxLength={16} value={channel.name} onChange={(e) => handleChange(e, 'name')} ></FormInput>
                <h3>Channels' Info</h3>
                <TextArea maxLength={100} value={channel.info} onChange={(e) => handleChange(e, 'info')}></TextArea>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={onSubmit} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCheck} />Add</Button>
                    <Button onClick={closeModal} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faTimes} />Cancel</Button>
                </div>
            </Modal>
        </ScrollChannels>
    )
}


export default connect(null, { setCurrentChannel, setPrivateChannel })(Channels);