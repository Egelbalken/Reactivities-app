import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment,Image, Button } from 'semantic-ui-react'

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/imonit3.png' alt='logo' style={{marginBottom: 22, marginTop: 22, width: '210px'}} />
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Imonits Reactivities!'/>
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to Activities
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage
