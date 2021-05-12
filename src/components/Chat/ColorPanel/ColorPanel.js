import React from 'react';
import { ColorPanelContainer } from '../../../styledComponents/ChannelsStyled';
import { Button } from '../../../styledComponents/FormStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const ColorPanel = () => {
    return (
        <ColorPanelContainer>
            <Button sidebar ><FontAwesomeIcon size='3x' icon={faPlusSquare} /></Button>
        </ColorPanelContainer>
    )
}


export default ColorPanel;