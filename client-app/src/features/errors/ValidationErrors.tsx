import React from 'react'
import { Message } from 'semantic-ui-react'

//cheating by useing any.. the also specify i: any when maping.
interface Props{
    errors: any;
}

const ValidationErrors = ({errors}: Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error: any, i: any) => (
                        <Message.Item key={i}>{error}</Message.Item>))}
                </Message.List>)}
        </Message>
    )
}

export default ValidationErrors
