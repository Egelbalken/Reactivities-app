import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Profile } from '../../app/models/Profile'

interface Props {
    profile: Profile
}

const ProfileCard = ({profile}: Props) => {
    return (
        <Fragment>
            <Card as={Link} to={`/profiles/${profile.username}`}>
                <Image src={profile.image || '/assets/user.png'}></Image>
                <Card.Content>
                    <Card.Header>{profile.displayName}</Card.Header>
                    <Card.Description>{profile.bio} Bio goes here</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user'> 20 followers</Icon>
                </Card.Content>
            </Card>
        </Fragment>
    )
}

export default observer(ProfileCard)
