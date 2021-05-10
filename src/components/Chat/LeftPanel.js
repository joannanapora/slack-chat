import React, { useState } from 'react';
import { StyledUl, Dropbtn, DropDownLi, DropDownContent, Header, SubA, ChatIcon } from '../../styledComponents/ChatStyled';


const LeftPanel = () => {

    const [options, setOptions] = useState([
        {
            key: 'user',
            text: 'Signed in as User',
            disabled: true
        },
        {
            key: 'avatar',
            text: 'Change Avatar'
        },
        {
            key: 'signout',
            text: 'Sign Out',
        },
    ]);

    return (
        <div>
            <Header>
                <ChatIcon src='https://www.flaticon.com/svg/vstatic/svg/3440/3440422.svg?token=exp=1620380798~hmac=77160ac20d0b46c6d78f1a6869bf622f' alt='parrot' />
                <p>DevChat</p>
            </Header>
            <StyledUl>
                <DropDownLi>
                    <Dropbtn onClick={() => this.handleClick("DropDown")}>
                        User
          </Dropbtn>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>Link 1</SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>Link 2</SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>Link 3</SubA>
                    </DropDownContent>
                </DropDownLi>
            </StyledUl>
        </div>
    )
}


export default LeftPanel;