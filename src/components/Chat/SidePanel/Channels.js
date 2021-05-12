import React, { useState, useEffect } from 'react';
import { ChannelsContainer, AddIcon, Channel } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faPlus, faCheck, faTimes, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Button, FormHeader, FormInput, TextArea } from "../../../styledComponents/FormStyled"
import firebase from '../../../firebase';
import { setCurrentChannel } from '../../../redux/actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';

const Channels = ({ currentUser, setCurrentChannel }) => {

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
    const [openChannels, setOpenChannels] = useState(false);
    const [ChannelList, setChannelList] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [activeChannel, setActiveChannel] = useState('');

    const [channel, setChannel] = useState({
        name: '',
        info: '',
        ref: firebase.database().ref('channels')
    })

    useEffect(() => {
        addListener()
        return () => {
            removeListener();
        }
    }, [])

    const addListener = () => {
        let loadedChannels = [];
        channel.ref.on('child_added', snap => {
            loadedChannels.push(snap.val());
            setChannelList([...ChannelList, ...loadedChannels]);
            setFirstChannel();
        });
    }

    const removeListener = () => {
        channel.ref.off();
    }

    const setFirstChannel = () => {

        const firstChannel = ChannelList[0]

        if (firstLoad && ChannelList.length > 0) {
            setCurrentChannel(firstChannel)
        }
        setFirstLoad(false);
    }

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const onChange = (event, name) => {
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

                console.log(error)
            })

    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (channel.name === '' || channel.info === '') {
            return
        } else addChannel();
    }

    const displayChannels = () => {
        return ChannelList.length > 0 && ChannelList.map((el) => {
            return (
                <Channel active={el.id === activeChannel} key={el.id} onClick={() => changeChannel(el)} name={el.name} ><FontAwesomeIcon size='1x' style={{ marginRight: '5px' }} icon={faHashtag} />{el.name} </Channel>
            )
        })
    }



    const changeChannel = (channelProp) => {
        setActiveChannel(channelProp.id)
        setCurrentChannel(channelProp)
    }

    const openChannelTab = () => {
        setOpenChannels(!openChannels)
    }

    return (
        <>
            <ChannelsContainer onClick={openChannelTab} ><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faExchangeAlt} />CHANNELS<p style={{ marginLeft: '5px' }} >({ChannelList.length})</p><AddIcon onClick={openModal} ><FontAwesomeIcon icon={faPlus} /></AddIcon ></ChannelsContainer>

            {openChannels && displayChannels()}

            <Modal
                appElement={document.getElementById('root')}
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="addChannelModal"
            >
                <FormHeader>Add a Channel</FormHeader>
                <h3>Channel's Name</h3>
                <FormInput value={channel.name} onChange={(e) => onChange(e, 'name')} ></FormInput>
                <h3>Channels' Info</h3>
                <TextArea value={channel.info} onChange={(e) => onChange(e, 'info')}></TextArea>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={onSubmit} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCheck} />Add</Button>
                    <Button onClick={closeModal} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faTimes} />Cancel</Button>
                </div>
            </Modal>
        </>
    )
}


export default connect(null, { setCurrentChannel })(Channels);