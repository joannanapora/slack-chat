import React from 'react';
import { MetaPanelContainer, MetaDetails, MetaInfo } from './MetaPanelStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPen, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../../styledComponents/ChatStyled';

const MetaPanel = ({ currentChannel, userPosts }) => {

    const displayTopPosters = () => {
        if (userPosts !== null) {
            return Object.entries(userPosts).sort((a, b) =>
                b[1].count - a[1].count
            ).map(([key, val], i) => {
                return (
                    <MetaInfo key={i} ><Image src={val.avatar} ></Image>{key}<br />{val.count} posts</MetaInfo>
                )
            })
        }
    }

    return (
        <MetaPanelContainer>
            About {currentChannel?.name}
            <br />
            <MetaDetails>
                <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faInfo} /> Channel Info
                <MetaInfo>{currentChannel?.info}</MetaInfo>
            </MetaDetails>
            <MetaDetails>
                <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faPen} /> Created By
                <MetaInfo user ><Image src={currentChannel?.createdBy.avatar} ></Image>{currentChannel?.createdBy.name}</MetaInfo>
            </MetaDetails>
            <MetaDetails top >
                <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faTrophy} /> Top Posters
                {displayTopPosters()}
            </MetaDetails>
        </MetaPanelContainer>
    )
}


export default MetaPanel;