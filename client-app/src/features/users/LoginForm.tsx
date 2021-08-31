import React, { Fragment } from 'react'
import { ErrorMessage, Form, Formik } from 'formik'
import { Button, Header, Label } from 'semantic-ui-react'
import FormTextInput from '../../app/common/form/FormTextInput'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

const LoginForm = () => {
    const { userStore } = useStore();

    return (
    <Fragment>
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values)
            .catch(error => setErrors({error: "invalid email or password"}))}
            >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content='Login to Imonit Reactivities' color='teal' textAlign='center' />
                    <FormTextInput name='email' placeholder='Email'/>
                    <FormTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage 
                        name='error' 
                        render={() => <Label style={{ marginBottom: 10 }} 
                        basic color='red' 
                        content={errors.error}/>} />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>)}
        </Formik>
    </Fragment>
    )
}

export default observer(LoginForm)
