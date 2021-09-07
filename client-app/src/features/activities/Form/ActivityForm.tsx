import { observer } from 'mobx-react-lite';
import { useEffect, useState} from 'react'
import { useStore } from '../../../app/stores/store';
import { Button, Header, Segment } from 'semantic-ui-react'
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
//import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../../../app/common/form/FormTextInput';
import FormTextArea from '../../../app/common/form/FormTextArea';
import FormSelectCategory from '../../../app/common/form/FormSelectCategory';
import { categoryOptions } from '../../../app/common/options/FormOptions';
import FormDateInput from '../../../app/common/form/FormDateInput';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';


    const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, 
         loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id:string}>()

    // Initial state values..
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required('The activity category is requierd.'),
        date: Yup.string().required('The activity date is required.').nullable(),
        city: Yup.string().required('The activity city is required.'),
        venue: Yup.string().required('The activity venue is required.')
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
    }, [id,loadActivity])
  
    /*
    */
    const handleFormSubmit = (activity: ActivityFormValues) => {
        if(!activity.id){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }
    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    // Formik enableReinitialize, collects the previus data from useState when editing.
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <FormTextInput name='title' placeholder='Title' />
                    <FormTextArea name='description' placeholder='Description' />
                    <FormSelectCategory options={categoryOptions} name='category' placeholder='Category' />
                    <FormDateInput 
                        name='date' 
                        placeholderText='Date' 
                        showTimeSelect 
                        timeCaption='Time'
                        timeFormat="H:mm"
                        dateFormat='MMMM dd, yyyy H:mm'
                    />
                    <Header content='Location Details' sub color='teal'/>
                    <FormTextInput name='city' placeholder='City' />
                    <FormTextInput name='venue' placeholder='Venue' />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid} 
                        loading={isSubmitting} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content='Submit'/>
                    <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
                </Form>
            )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)
