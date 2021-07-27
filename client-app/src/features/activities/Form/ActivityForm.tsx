import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState} from 'react'
import { useStore } from '../../../app/stores/store';
import { Button, Segment, Form } from 'semantic-ui-react'
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';


    const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, 
        loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id:string}>()

    // Initial state values..
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: '',
        venue: '',
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id,loadActivity])
  

    const submitHandler = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    // The event change in the form will be changed 
    // and equal too the position name att title.
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler} autoComplete='off'>
                <Form.Input placeholder="Title" 
                value={activity.title} 
                name='title' 
                onChange={inputChangeHandler}
                />
                <Form.TextArea placeholder="Description" value={activity.description} 
                name='description' 
                onChange={inputChangeHandler} />
                <Form.Input placeholder="Category" value={activity.category} 
                name='category' 
                onChange={inputChangeHandler}/>
                <Form.Input type="date" placeholder="Date" value={activity.date} 
                name='date' 
                onChange={inputChangeHandler}/>
                <Form.Input placeholder="City" value={activity.city} 
                name='city' 
                onChange={inputChangeHandler}/>
                <Form.Input placeholder="Venue" value={activity.venue} 
                name='venue' 
                onChange={inputChangeHandler}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
