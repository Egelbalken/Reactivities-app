import { ChangeEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity: Activity | undefined;
    closeForm : () => void;
}

const ActivityForm = ({activity: selectedActivity, closeForm} : Props) => {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        day: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState);

    const submitHandler = () => {
        console.log(activity)
    }

    // The event change in the form will be changed 
    // and equal too the position name att title.
    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler} autoComplete='off'>
                <Form.Input placeholder="Title" Value={activity.title} name='title' onChange={inputChangeHandler}/>
                <Form.TextArea placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Form.Input placeholder="Date" />
                <Form.Input placeholder="City" />
                <Form.Input placeholder="Venue" />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
