import React from 'react'
import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'
// From the doc of FORMIK package

// create a interface whit input form props
interface Props{
    placeholder: string;
    name: string;
    label?: string;
}

// Component that gives us a reuseable input text field.
const FormTextInput = (props: Props) => {
    
    // Then we use the hook useField 
    const [field, meta] = useField(props.name)


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
                ) : null}
        </Form.Field>
    )
}

export default FormTextInput
