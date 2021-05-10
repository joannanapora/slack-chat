import React from 'react';
// import ColorPanel from './Chat/ColorPanel';
// import Messages from './Chat/Messages';
// import MetaPanel from './Chat/MetaPanel';
import LeftPanel from '../components/Chat/LeftPanel';
import { MetaPanel, Messages, AppContainer, SidePanel } from '../styledComponents/ChatStyled';


const Application = () => {
  return (
    <AppContainer>
      <SidePanel><LeftPanel /></SidePanel>
      <Messages>dwd</Messages>
      <MetaPanel>dfd</MetaPanel>
    </AppContainer>
  );
}

export default Application;
