import React, { Fragment } from 'react';
// Axios API fetcher.
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// uuid is a package that helps us create a unic id for our activtys.
// It is sent dont in createOrEditActivityHandler
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';
import ActivityForm from '../../features/activities/Form/ActivityForm';
import AboutPage from '../../features/About/AboutPage';
import ActivitiesDetails from '../../features/activities/Details/ActivitiesDetails';


const App = () => {

  // To restart the initial parameters when in editing, and whnat to create a 
  // new activity.
  const location = useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'} render={() =>( 
        <>  
        <Navbar/>
        <Container 
          style={{marginTop: '10em'}}>
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route path='/activities/:id' component={ActivitiesDetails} />
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
          <Route path='/about' component={AboutPage} />
        </Container>
        </>
        )}
      />
    </Fragment>
  );
}

// Observe from MobX lite helps us to observe some changes in store.
export default observer(App);
