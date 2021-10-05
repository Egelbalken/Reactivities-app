import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Header, Segment,Image, Button, Icon, Menu } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = () => {
    const { userStore, modalStore } = useStore();
    return (
        <Segment textAlign='center' vertical className='masthead'>
                    <Menu outline secondary fixed='top'>
                        <Button style={{marginTop: '10px'}} animated position='right' inverted icon='question' as={NavLink} to='/about' name='About'>
                            <Button.Content visible>
                                <span><Icon name='question' /></span>About
                            </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' content='About'/>
                                </Button.Content>
                        </Button>
                    </Menu>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/imonit3.png' alt='logo' style={{marginBottom: 22, marginTop: 22, width: '210px'}} />
                    Imonit<span><Icon name='compass'/></span>
                </Header>
                {userStore.isLoggedIn ? (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Imonit activity!'/>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                        Login!
                    </Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                    Register!
                    </Button>
                    </Fragment>
                )}
            </Container>
        </Segment>
    )
}

export default HomePage
