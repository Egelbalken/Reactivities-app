import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';


const ActivityDashboard = () => {

        const { activityStore } = useStore()
        const {loadActivities, activityRegistry} = activityStore;

        // Use Effect whit axios get of api data. Whit the useEffect we get it one time
        // insted of a infinitive loop from only the state hook.
        // Via the interface we can set the type to Activity[] array.
        useEffect(() => {
          if (activityRegistry.size <= 1) loadActivities();
        }, [activityRegistry.size, loadActivities])
      
        // We check if we are loading before going to the jsx content.
        if(activityStore.loadingInitial) return <LoadingComponent content='loading activities...'/>
    return (
        <Fragment>
            <Grid>
                <Grid.Column width='10' >
                <ActivityList />
                </Grid.Column>
                <Grid.Column width='6'>
                    <ActivityFilters />
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default observer(ActivityDashboard)
