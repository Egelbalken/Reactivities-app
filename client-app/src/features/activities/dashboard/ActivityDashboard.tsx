import React from 'react'
import { Fragment } from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivitiesDetails from '../Details/ActivitiesDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';

// We specify the type av Activity[] then put it in as props.
// Define type of props to pass 
interface Props{
    activities: Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id: string) => void;
    cancelSelectActivity: () => void;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm : () => void;
    createOrEditActivity : (activity: Activity) => void;
    deleteActivity : (id:string) => void;
}

const ActivityDashboard = ({
    activities, 
    selectedActivity, 
    selectActivity, 
    cancelSelectActivity, 
    editMode, 
    openForm, 
    closeForm, 
    createOrEditActivity, 
    deleteActivity}: Props) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width='10' >
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}/>
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                    <ActivitiesDetails 
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                    {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEditActivity={createOrEditActivity}/>}
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}

export default ActivityDashboard
