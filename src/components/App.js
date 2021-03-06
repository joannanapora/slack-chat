import React from 'react';
import LeftPanel from './Chat/SidePanel/UserSettings';
import { AppContainer, SidePanel } from '../styledComponents/ChatStyled';
import { connect } from 'react-redux';
import Messages from './Chat/Messages/Messages';
import MetaPanel from './Chat/MetaPanel/MetaPanel';
import ColorPanel from './Chat/ColorPanel/ColorPanel';

const Application = ({ currentUser, currentChannel, isPrivateChannel, userPosts }) => {
  return (
    <>
      <AppContainer>
        <LeftPanel
          currentChannel={currentChannel}
          currentUserProp={currentUser}
        />

        <Messages isPrivateChannel={isPrivateChannel} key={currentChannel && currentChannel.id} currentUser={currentUser} currentChannel={currentChannel} ></Messages>
        {!isPrivateChannel && currentChannel && currentUser ?
          <MetaPanel userPosts={userPosts} currentChannel={currentChannel} />
          : <div></div>
        }
      </AppContainer>
    </>
  );
};


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(Application);
