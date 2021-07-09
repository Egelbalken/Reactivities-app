import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';



const App = () => {

  //Hook to fetch the data
  const [activities, setActivities] = useState([]);

  // Use Effect
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
