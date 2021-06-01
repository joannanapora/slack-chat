import React from 'react';
// import ColorPanel from './Chat/ColorPanel';
// import Messages from './Chat/Messages';
// import MetaPanel from './Chat/MetaPanel';
import LeftPanel from './Chat/SidePanel/UserSettings';
import { MetaPanel, AppContainer, SidePanel } from '../styledComponents/ChatStyled';
import { connect } from 'react-redux';
import ColorPanel from './Chat/ColorPanel/ColorPanel';
import Messages from './Chat/Messages/Messages';

const Application = ({ currentUser, currentChannel, isPrivateChannel }) => {
  return (
    <AppContainer>
      <ColorPanel></ColorPanel>
      <SidePanel><LeftPanel key={currentUser && currentUser.uid} currentUser={currentUser} currentChannel={currentChannel} /></SidePanel>
      <Messages isPrivateChannel={isPrivateChannel} key={currentChannel && currentChannel.id} currentUser={currentUser} currentChannel={currentChannel} >dwd</Messages>
      <MetaPanel>dfd</MetaPanel>
    </AppContainer>
  );
};


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,

});

export default connect(mapStateToProps)(Application);
