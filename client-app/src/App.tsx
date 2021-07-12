import React, { useState,useEffect } from 'react';
import './App.css';
// Axios API fetcher.
import axios from 'axios';
// It is a type of component bootstrap
import { Header, List } from 'semantic-ui-react';



const App = () => {

  //Hook to fetch the data
  const [activities, setActivities] = useState([]);

  // Use Effect whit axios get of api data. Whit the useEffect we get it one time
  // insted of a infinitive loop from only the state hook.
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
      console.log(response)
    })
    return () => {
    }
  }, [])

  return (
    <div>
      <Header as='h2' icon="users" content='Reactivities' />
       <List>{activities.map((activity: any) => (
         <List.Item key={activity.id}>{activity.title}</List.Item>
         ))}
       </List>
    </div>
  );
}

export default App;
