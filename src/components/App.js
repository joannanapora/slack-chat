import React from 'react';
// import ColorPanel from './Chat/ColorPanel';
// import Messages from './Chat/Messages';
// import MetaPanel from './Chat/MetaPanel';
import LeftPanel from './Chat/SidePanel/UserSettings';
import { MetaPanel, Messages, AppContainer, SidePanel } from '../styledComponents/ChatStyled';
import { connect } from 'react-redux';
import ColorPanel from './Chat/ColorPanel/ColorPanel';

const Application = ({ currentUser }) => {
  return (
    <AppContainer>
      <ColorPanel></ColorPanel>
      <SidePanel><LeftPanel currentUser={currentUser} /></SidePanel>
      <Messages>dwd</Messages>
      <MetaPanel>dfd</MetaPanel>
    </AppContainer>
  );
};


const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Application);
