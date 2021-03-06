import React, { Fragment } from 'react'
import { ErrorMessage, Form, Formik } from 'formik'
import { Button, Header } from 'semantic-ui-react'
import FormTextInput from '../../app/common/form/FormTextInput'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors'

const RegisterForm = () => {
    const { userStore } = useStore();

    return (
    <Fragment>
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null || undefined}}
            onSubmit={(values, {setErrors}) => userStore.register(values)
            .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
            >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' content='Sign up to Imonit Reactivities' color='teal' textAlign='center' />
                    <FormTextInput name='displayName' placeholder='Display Name'/>
                    <FormTextInput name='username' placeholder='Username'/>
                    <FormTextInput name='email' placeholder='Email'/>
                    <FormTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage 
                        name='error' 
                        render={() => <ValidationErrors errors={errors.error} />} />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} 
                        positive content='Register' 
                        type='submit' 
                        fluid />
                </Form>)}
        </Formik>
    </Fragment>
    )
}

export default observer(RegisterForm)
