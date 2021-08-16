import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


const ActivityList = () => {
    const { activityStore } = useStore();
    const {groupedActivities} = activityStore;

    // Group activites by date in the card. map over the groups, 
    // then map over activity.
    return (
        <Fragment>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}/>
                        ))}
                </Fragment>
            ))}
        </Fragment>
    )
}
export default observer(ActivityList)