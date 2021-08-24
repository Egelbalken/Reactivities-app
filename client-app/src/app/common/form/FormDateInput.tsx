import React from 'react'
import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'
// From the doc of FORMIK package

// Component that gives us a reuseable input text field.
const FormDateInput = (props: Partial<ReactDatePickerProps>) => {
    
    // Then we use the hook useField 
    const [field, meta, helpers] = useField(props.name!)


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
                ) : null}
        </Form.Field>
    )
}

export default FormDateInput
