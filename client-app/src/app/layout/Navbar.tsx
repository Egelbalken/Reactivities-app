import React from 'react'
import { Container, Menu, Button } from 'semantic-ui-react'
import { useStore } from '../stores/store';


const Navbar = () => {

    const {activityStore} = useStore();

    return (
        <Menu 
        inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img 
                    src='/assets/imonit3.png' alt='logo' 
                    style={{marginRight: '20px', width:'70px'}}>
                    </img>
                    Imonit Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item >
                    <Button 
                    onClick={() => activityStore.openForm()}
                    positive 
                    content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default Navbar
