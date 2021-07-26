import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState} from 'react'
import { useStore } from '../../../app/stores/store';
import { Button, Segment, Form } from 'semantic-ui-react'


    const ActivityForm = () => {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

    // Initial state values..
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState);

    const submitHandler = () => {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    // The event change in the form will be changed 
    // and equal too the position name att title.
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

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
                <Button  onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
