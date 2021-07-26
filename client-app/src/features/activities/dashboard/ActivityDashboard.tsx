import { observer } from 'mobx-react-lite';
import React from 'react'
import { Fragment } from 'react'
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivitiesDetails from '../Details/ActivitiesDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';


const ActivityDashboard = () => {

        const { activityStore } = useStore()
        const {selectedActivity, editMode } = activityStore;
    return (
        <Fragment>
            <Grid>
                <Grid.Column width='10' >
                <ActivityList />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                    <ActivitiesDetails />}
                    {editMode &&
                    <ActivityForm />}
                    
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default observer(ActivityDashboard)
