import React from 'react';
// import ColorPanel from './Chat/ColorPanel';
// import Messages from './Chat/Messages';
// import MetaPanel from './Chat/MetaPanel';
import LeftPanel from './Chat/SidePanel/UserSettings';
import { MetaPanel, Messages, AppContainer, SidePanel } from '../styledComponents/ChatStyled';
import { connect } from 'react-redux';

const Application = ({ currentUser }) => {
  return (
    <AppContainer>
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
