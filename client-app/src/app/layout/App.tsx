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
      <Navbar/>
      <Container 
      style={{marginTop: '7vh'}}>
       <ActivityDashboard 
       activities={activities}
       />
      </Container>
    </Fragment>
  );
}

export default App;
