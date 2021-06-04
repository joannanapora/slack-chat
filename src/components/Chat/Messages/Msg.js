import React from 'react';
import { Comment, AvatarContainer, Username, Date, Text, MsgContent } from '../../../styledComponents/ChannelsStyled';
import moment from 'moment';

const Msg = ({ message, user }) => {
    const timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow();
    }

    const isImage = (message) => {
        return !!message.image;
    }

    return (
        <Comment isMine={message.user.id === user.uid}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <AvatarContainer src={message.user.avatar} alt='av'></AvatarContainer>
            </div>
            <MsgContent mine={message.user.id === user.uid} >
                <div style={{ display: 'flex' }} >
                    <Username>
                        {user}
                    </Username>
                    <Date>{timeFromNow(message.timestamp)}</Date>
                </div>
                {isImage(message) ? <img style={{ padding: '5px' }} width='100%' height='100%' alt='img' src={message.image} ></img> : <Text>{message.content}</Text>}
            </MsgContent>
        </Comment>
    )
}

export default Msg;

