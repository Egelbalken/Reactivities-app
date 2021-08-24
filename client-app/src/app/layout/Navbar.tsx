import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'

const Navbar = () => {

    return (
        <Menu 
        inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img 
                    src='/assets/imonit3.png' alt='logo' 
                    style={{marginRight: '20px', width:'70px'}}>
                    </img>
                    Imonit Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'/>
                <Menu.Item as={NavLink} to='/errors' name='Errors'/>
                <Menu.Item as={NavLink} to='/about' name='About' />
                <Menu.Item >
                    <Button 
                    as={NavLink} to='/createActivity'
                    positive 
                    content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default Navbar
