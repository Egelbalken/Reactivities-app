import React, { useState,useEffect, Fragment } from 'react';
// Axios API fetcher.
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// uuid is a package that helps us create a unic id for our activtys.
// It is sent dont in createOrEditActivityHandler
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


const App = () => {

  //Hook to fetch the data
  const [activities, setActivities] = useState<Activity[]>([]);

  //Need some state to schoose activity
  //State to select a specific 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  //Need to edit
  //a state to edit and create a activity when pushing button
  const [editMode, setEditMode] = useState(false);


  // const for loading animation delay.. 
  const [loading, setLoading] = useState(true);


  // we add a state to see if we are submitting a change or create of a activity
  const [submitting, setSubmitting] = useState(false);

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

  // Creates a new activity or let us edit one existing. 
  // If we have a activity whit an id, we update it. if not we create a new.
  const createOrEditActivityHandler =(activity: Activity)=> {
    setSubmitting(true);
    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      }) 
    } else{
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          setActivities([...activities, activity]);
          setSelectedActivity(activity)
          setEditMode(false)
          setSubmitting(false)
      })
    }
  }

  const deleteActivityHandler = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }

  // Use Effect whit axios get of api data. Whit the useEffect we get it one time
  // insted of a infinitive loop from only the state hook.
  // Via the interface we can set the type to Activity[] array.
  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
    return () => {
    }
  }, [])

  // We check if we are loading before going to the jsx content.
  if(loading) return <LoadingComponent content='loading app'/>

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
       submitting = {submitting}
       />
      </Container>
    </Fragment>
  );
}

export default App;
