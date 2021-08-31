import React, { Fragment, useEffect } from 'react';
// Axios API fetcher.
// It is a type of component bootstrap
import { Container } from 'semantic-ui-react';
// interface of a Activity whit a array
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// uuid is a package that helps us create a unic id for our activtys.
// It is sent dont in createOrEditActivityHandler
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';
import ActivityForm from '../../features/activities/Form/ActivityForm';
import AboutPage from '../../features/About/AboutPage';
import ActivitiesDetails from '../../features/activities/Details/ActivitiesDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


const App = () => {

  // To restart the initial parameters when in editing, and whnat to create a 
  // new activity.
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  },[commonStore, userStore])

  // Loadingflag. "Load this before rendering and returning the App component"
  if(!commonStore.appLoaded){
    return <LoadingComponent content='"Imonit" to loading the app...'/>
  }

  // When using the <Switch> we can exclude all the conent not in use.
  // So, when a bad link is opend we routes to the NotFound. 
  // Or.. if we click NotFoudn button we execute that byggyrepport.
  return (
    <Fragment>
      <ToastContainer position={'bottom-right'} hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'} render={() =>( 
          <>  
        <Navbar/>
        <Container style={{marginTop: '10em'}}>
          <Switch>
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route path='/activities/:id' component={ActivitiesDetails} />
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
          <Route path='/about' component={AboutPage} />
          <Route path='/errors' component={TestErrors} />
          <Route path='/server-error' component={ServerError}/>
          <Route path='/login' component={LoginForm}/>
          <Route component={NotFound} />
          </Switch>
        </Container>
        </>
        )}
        />
    </Fragment>
  );
}

// Observe from MobX lite helps us to observe some changes in store.
export default observer(App);
