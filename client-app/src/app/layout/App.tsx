import React, { useState,useEffect, Fragment } from 'react';
// Axios API fetcher.
import axios from 'axios';
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// uuid is a package that helps us create a unic id for our activtys.
// It is sent dont in createOrEditActivityHandler
import { v4 as uuid} from 'uuid';


const App = () => {

  //Hook to fetch the data
  const [activities, setActivities] = useState<Activity[]>([]);

  //Need some state to schoose activity
  //State to select a specific 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  //Need to edit
  //a state to edit and create a activity when pushing button
  const [editMode, setEditMode] = useState(false);

  //a state for selected actiity
  const selectActivityHandler = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  //a State for to cancel activity
  const selectCancelActicityHandler = () => {
    setSelectedActivity(undefined);
  }

  // Opens the textforms
  const formOpenHandler = (id? : string) =>{
    id ? selectActivityHandler(id) : selectCancelActicityHandler();
    setEditMode(true);
  }

  // Closes the text form
  const formCloseHandler = () => {
    setEditMode(false);
  }

  // Creates a new activity or let us edit one existing. We allso 
  const createOrEditActivityHandler =(activity: Activity)=> {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)])

  }

  // Use Effect whit axios get of api data. Whit the useEffect we get it one time
  // insted of a infinitive loop from only the state hook.
  // Via the interface we can set the type to Activity[] array.
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
    })
    return () => {
    }
  }, [])

  // Via the interface we can set the type to Activity[] array.
  return (
    <Fragment>
      <Navbar openForm={formOpenHandler}/>
      <Container 
      style={{marginTop: '10em'}}>
       <ActivityDashboard 
       activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={selectActivityHandler}
       cancelSelectActivity={selectCancelActicityHandler}
       editMode={editMode}
       openForm={formOpenHandler}
       closeForm={formCloseHandler}
       createOrEditActivity={createOrEditActivityHandler}
       deleteActivity={deleteActivityHandler}
       />
      </Container>
    </Fragment>
  );
}

export default App;
