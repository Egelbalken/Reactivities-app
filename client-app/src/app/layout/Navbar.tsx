import React from 'react'
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Button, Image, Dropdown } from 'semantic-ui-react'
import { useStore } from '../stores/store';

const Navbar = () => {
    // need to use a abserver becouse we need to know if a user has
    // been updated to the store.
    const { userStore: {user, logout} } = useStore();
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
                <Menu.Item position='right' >
                    <Image 
                        src={user?.image || '/assets/user.png'} 
                        avatar spaced='right'
                        alt="No image"
                        />
                </Menu.Item >
                <Dropdown   pointing='top left' 
                            text={user?.displayName}
                            icon='arrow alternate circle down outline'
                            >
                    <Dropdown.Menu>
                        <Dropdown.Item 
                            color='white'
                            as={Link} 
                            to={`/profile/${user?.username}`} 
                            text='My Profile' icon='user' />
                        <Dropdown.Item 
                            color='white'
                            onClick={logout} 
                            text='logout'
                            icon='power'
                            />
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    )
}
// OBS! Observer.
export default observer(Navbar)
