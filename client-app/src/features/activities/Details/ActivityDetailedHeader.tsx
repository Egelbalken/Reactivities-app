import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    const {activityStore: {UpdateAttendeence, loading, cancelActivityToggle}} = useStore()
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled && 
                <Label style={{position: 'absolute',zIndex: 1000, left: -14, top: 20}}
                    ribbon color='red' content='Cancelled'></Label>}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy H:mm')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <Fragment>
                        <Button 
                            onClick={cancelActivityToggle} 
                            loading={loading} 
                            basic
                            content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            color={activity.isCancelled ? 'green' : 'red'}
                        />

                        <Button 
                            disabled={activity.isCancelled}
                            as={Link} 
                            to={`/manage/${activity.id}`} 
                            color='orange' 
                            floated='right'>
                            Manage Event
                        </Button>
                    </Fragment>
                    ) : activity.isGoing ? (
                        <Button 
                            onClick={UpdateAttendeence} 
                            loading={loading}>Cancel attendance
                        </Button>
                    ) : (
                    <Button 
                        onClick={UpdateAttendeence} 
                        disabled={activity.isCancelled} 
                        loading={loading} 
                        color='teal'>Join Activity
                    </Button>
                    )}
            </Segment>
        </Segment.Group>
    )
})
