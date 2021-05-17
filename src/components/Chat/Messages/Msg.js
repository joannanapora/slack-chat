import React from 'react';
import { Comment, AvatarContainer, Username, Date, Text, MsgContent } from '../../../styledComponents/ChannelsStyled';
import moment from 'moment';

const Msg = ({ message, user }) => {


    const timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow();
    }

    return (
        <Comment isMine={message.user.id === user.uid}>
            <AvatarContainer src={message.user.avatar} alt='av'></AvatarContainer>
            <MsgContent>
                <div style={{ display: 'flex' }} >
                    <Username>
                        {user.displayName}
                    </Username>
                    <Date>{timeFromNow(message.timestamp)}</Date>
                </div>
                <Text>
                    {message.content}
                </Text>
            </MsgContent>
        </Comment>
    )
}

export default Msg;