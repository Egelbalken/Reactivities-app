import { observer } from 'mobx-react-lite'
import React, { Fragment, SyntheticEvent } from 'react'
import { Reveal, Button } from 'semantic-ui-react'
import { Profile } from '../../app/models/Profile'
import { useStore } from '../../app/stores/store'

interface Props {
    profile: Profile;
}

const FollowButton = ({profile} : Props) => {

    const {profileStore, userStore} = useStore();
    const {updateFollowing, loadingFollow } = profileStore;

    if(userStore.user?.username === profile.username){
        return null;
    }

    const handleFollow = (e: SyntheticEvent, username:string) => {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) :
        updateFollowing(username, true);
    }

    return (
        <Fragment>
            <Reveal animated='move'>
                    <Reveal.Content visible style={{width: '100%'}}>
                        <Button 
                            fluid 
                            collor='teal' 
                            content={profile.following ? 'Following' : 'Not following'} />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width: '100%'}}>
                        <Button 
                            fluid 
                            basic
                            color={profile.following ? 'red' : 'green'} 
                            content={profile.following ? 'Unfollow' : 'Follow'}
                            loading={loadingFollow} 
                            onClick={(e) => handleFollow(e, profile.username)}
                        />
                    </Reveal.Content>
                </Reveal>
        </Fragment>
    )
}

export default observer(FollowButton)
