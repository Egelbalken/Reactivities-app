import React from 'react'
import { useField } from 'formik'
import { Form, Label, Select } from 'semantic-ui-react'
// From the doc of FORMIK package

// create a interface whit input form props
interface Props{
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

// Component that gives us a reuseable input text field.
const FormSelectCategory = (props: Props) => {
    
    // Then we use the hook useField 
    const [field, meta, helpers] = useField(props.name)


    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
                ) : null}
        </Form.Field>
    )
}

export default FormSelectCategory
