import React, { useState,useEffect, Fragment } from 'react';
// Axios API fetcher.
import axios from 'axios';
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {

  //Hook to fetch the data
  const [activities, setActivities] = useState<Activity[]>([]);

  //Need some state to schoose activity
  //State to select a specific 
  const [selectedActivity, setSelectedActivities] = useState<Activity | undefined>(undefined);

  //Need to edit
  //a state to edit and create a activity when pushing button
  const [editMode, setEditMode] = useState(false);

  //a state for selected actiity
  const selectedActivityHandler = (id: string) => {
    setSelectedActivities(activities.find(x => x.id === id));
  }

  //a State for to cancel activity
  const selectCancelActicityHandler = () => {
    setSelectedActivities(undefined);
  }

  const formOpenHandler = (id? : string) =>{
    id ? selectedActivityHandler(id) : selectCancelActicityHandler();
    setEditMode(true);
  }

  const formCloseHandler = () => {
    setEditMode(false);
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
      style={{marginTop: '10vh'}}>
       <ActivityDashboard 
       activities={activities}
       selectedActivity={selectedActivity}
       selectActivity={selectedActivityHandler}
       cancelSelectActivity={selectCancelActicityHandler}
       editMode={editMode}
       openForm={formOpenHandler}
       closeForm={formCloseHandler}
       />
      </Container>
    </Fragment>
  );
}

export default App;
