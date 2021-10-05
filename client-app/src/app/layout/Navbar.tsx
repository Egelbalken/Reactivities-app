import React from 'react'
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Button, Image, Dropdown, Header } from 'semantic-ui-react'
import { useStore } from '../stores/store';

const Navbar = () => {
    // need to use a abserver becouse we need to know if a user has
    // been updated to the store.
    const { userStore: {user, logout} } = useStore();
    return (
        <Menu
            icon='labeled' 
            inverted secondary
            fixed='top'>
            <Container>
                <Image 
                    as={NavLink} to='/' exact header style={{marginTop: '5px',marginBottom: '5px',width:'80px', marginRight:'80px'}}
                    src='/assets/imonit3.png' alt='logo' 
                />
               
                <Menu.Item icon='compass' as={NavLink} to='/activities' name='Activities'/>
                <Menu.Item icon='react' 
                    as={NavLink} to='/createActivity'
                    name='Create Activity'
                    >
                </Menu.Item>
                <Menu.Item icon='question' as={NavLink} to='/about' name='About' />
                <Menu.Item icon='bug' as={NavLink} to='/errors' name='Errors'/>
                <Menu.Item position='right' >
                    <Image 
                        size='tiny'
                        src={user?.image || '/assets/user.png'} 
                        avatar spaced='right'
                        alt="No image"
                        />
                </Menu.Item>
                <Dropdown   
                    pointing='top left' 
                    text={user?.displayName}
                    icon='arrow alternate circle down outline'
                    color='white'
                    >
                    <Dropdown.Menu>
                        <Dropdown.Item 

                            as={Link} 
                            to={`/profiles/${user?.username}`} 
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
