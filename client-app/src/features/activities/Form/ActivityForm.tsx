import { ChangeEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity: Activity | undefined;
    closeForm : () => void;
    createOrEditActivity: (activity : Activity) => void;
    submitting: boolean;
}

const ActivityForm = ({activity: selectedActivity, closeForm, createOrEditActivity, submitting} : Props) => {

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
        createOrEditActivity(activity);
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button  onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
