import React from 'react'
import { Fragment } from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivitiesDetails from '../Details/ActivitiesDetails';
import ActivityList from './ActivityList';

// We specify the type av Activity[] then put it in as props.
interface Props{
    activities: Activity[];
}

const ActivityDashboard = ({activities}: Props) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width='10' >
                <ActivityList activities={activities}/>
                </Grid.Column>
                <Grid.Column width='6'>
                    {activities[0] && 
                    <ActivitiesDetails activity={activities[0]} />}
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default ActivityDashboard
