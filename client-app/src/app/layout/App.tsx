import React, { useEffect, Fragment } from 'react';
// Axios API fetcher.
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// uuid is a package that helps us create a unic id for our activtys.
// It is sent dont in createOrEditActivityHandler
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = () => {

  const {activityStore} = useStore();


  // Use Effect whit axios get of api data. Whit the useEffect we get it one time
  // insted of a infinitive loop from only the state hook.
  // Via the interface we can set the type to Activity[] array.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  // We check if we are loading before going to the jsx content.
  if(activityStore.loadingInitial) return <LoadingComponent content='loading app'/>

  // Via the interface we can set the type to Activity[] array.
  return (
    <Fragment>
      <Navbar/>
      <Container 
      style={{marginTop: '10em'}}>
       <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

// Observe from MobX lite helps us to observe some changes in store.
export default observer(App);
