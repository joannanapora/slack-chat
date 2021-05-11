import React, { useState } from 'react';
import { ChannelsContainer, AddIcon } from '../../../styledComponents/ChannelsStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, FormHeader, FormLabel, FormInput, TextArea } from "../../../styledComponents/FormStyled"
import Modal from 'react-modal';

const Channels = () => {

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

    const [channelsCounter, setChannelsCounter] = useState([
    ]);

    const [channelName, setChannelName] = useState('');
    const [channelInfo, setChannelInfo] = useState('');


    const [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const onNameChange = (event) => {
        setChannelName(event.target.value)
    }
    const onInfoChange = (event) => {
        setChannelInfo(event.target.value)

    }



    return (
        <>
            <ChannelsContainer><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faExchangeAlt} />CHANNELS<p><p style={{ marginLeft: '5px' }} >({channelsCounter.length})</p></p><AddIcon onClick={openModal} ><FontAwesomeIcon icon={faPlus} /></AddIcon ></ChannelsContainer>
            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="addChannelModal"
            >
                <FormHeader>Add a Channel</FormHeader>
                <h3>Channel's Name</h3>
                <FormInput value={channelName} onChange={onNameChange} ></FormInput>
                <h3>Channels' Info</h3>
                <TextArea value={channelInfo} onChange={onInfoChange}></TextArea>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCheck} />Add</Button>
                    <Button type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faTimes} />Cancel</Button>
                </div>
            </Modal>
        </>
    )
}


export default Channels;