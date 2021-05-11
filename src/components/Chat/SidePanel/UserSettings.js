import React, { useState, useEffect } from 'react';
import { ListItem, Image, Header, ChatIcon, DropDownList, DropDownListContainer, DownArrow, UpArrow, DropDownHeader, DropDownContainer } from '../../../styledComponents/ChatStyled';
import firebase from '../../../firebase';
import Channels from './Channels';

const LeftPanel = ({ currentUser }) => {

    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
    }, [dropdown, currentUser])


    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    const handleOptionSelect = (key) => {
        if (key === 'signout') {
            firebase.auth().signOut()
        }
        if (key === 'change avatar') {

        }
    }

    return (
        <div >
            <Header>
                <ChatIcon src='https://www.flaticon.com/svg/vstatic/svg/3440/3440422.svg?token=exp=1620380798~hmac=77160ac20d0b46c6d78f1a6869bf622f' alt='parrot' />
                <p>DevChat</p>
            </Header>
            <DropDownContainer>
                <DropDownHeader onClick={handleDropdown}><Image src={currentUser?.photoURL} ></Image><p>{currentUser?.displayName}{!dropdown ? <DownArrow /> : <UpArrow />}</p></DropDownHeader>
                {dropdown && (
                    <DropDownListContainer>
                        <DropDownList>
                            <ListItem disabled onClick={() => handleOptionSelect('user')}>Signed in as User</ListItem>
                            <ListItem onClick={() => handleOptionSelect('avatar')}>Change Avatar</ListItem>
                            <ListItem onClick={() => handleOptionSelect('signout')}>Sign Out</ListItem>
                        </DropDownList>
                    </DropDownListContainer>
                )}
                <Channels />
            </DropDownContainer>
        </div >
    )
}

export default LeftPanel;