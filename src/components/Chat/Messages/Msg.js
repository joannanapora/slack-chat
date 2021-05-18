import React from 'react';
import { Comment, AvatarContainer, Username, Date, Text, MsgContent } from '../../../styledComponents/ChannelsStyled';
import moment from 'moment';

const Msg = ({ message, user }) => {

    console.log(message.image)


    const timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow();
    }

    const isImage = (message) => {
        return !!message.image;
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
                {isImage(message) ? <img width='100%' height='100%' alt='' src={message.image} ></img> : <Text>{message.content}</Text>}
            </MsgContent>
        </Comment>
    )
}

export default Msg;

// gs://slack-chat-926b4.appspot.com/chat/public/99a044fd-a749-4fa7-b701-9c8655e1d30c.jpg
// https://firebasestorage.googleapis.com/v0/b/slack-chat-926b4.appspot.com/o/chat%2Fpublic%2F756f272a-61c5-4baa-8238-6daa9b27dfdf.jpg?alt=media&token=ca59a677-c380-4b70-a704-8dd8d1f2ba74
