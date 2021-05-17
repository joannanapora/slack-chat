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
                <ChatIcon src='https://img-premium.flaticon.com/png/512/1355/1355890.png?token=exp=1621261244~hmac=e47ee724eca16d90020ca44f04b657ec' alt='parrot' />
                <p>DevChat</p>
            </Header>
            <DropDownContainer>
                <DropDownHeader onClick={handleDropdown}><Image src={currentUser?.photoURL} ></Image><div>{currentUser?.displayName}{!dropdown ? <DownArrow /> : <UpArrow />}</div></DropDownHeader>
                {dropdown && (
                    <DropDownListContainer>
                        <DropDownList>
                            <ListItem disabled onClick={() => handleOptionSelect('user')}>Signed in as User</ListItem>
                            <ListItem onClick={() => handleOptionSelect('avatar')}>Change Avatar</ListItem>
                            <ListItem onClick={() => handleOptionSelect('signout')}>Sign Out</ListItem>
                        </DropDownList>
                    </DropDownListContainer>
                )}
                <Channels currentUser={currentUser} />
            </DropDownContainer>
        </div >
    )
}

export default LeftPanel;