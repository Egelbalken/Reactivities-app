import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Image, List, Popup } from 'semantic-ui-react'
import { Profile } from '../../../app/models/Profile'
import ProfileCard from '../../profiles/ProfileCard'

interface Props {
    attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees} : Props) => {
    const styles = {
        borderColor: 'orange',
        borderWidth: 2,
        boxShadow: '2px 2px 5px black'
    
    }
    return (
        <List horizontal>
            {attendees.map(attendee => (
            <Popup 
                hoverable
                key={attendee.username}
                trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Image 
                            style={attendee.following ? styles : null} 
                            bordered
                            size='mini' 
                            circular src={attendee.image || '/assets/user.png' }/>
                    </List.Item>
                }>
                <Popup.Content>
                    <ProfileCard profile={attendee}/>
                </Popup.Content>
            </Popup>
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendee)
