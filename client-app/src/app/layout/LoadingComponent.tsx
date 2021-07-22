import React from 'react'
// Dimmer is a loading animation for a normal use.
import { Dimmer, Loader } from 'semantic-ui-react'

// interface for loading text.
interface Props {
    inverted?: boolean;
    content?: string;
}

// Component that loads on a delay when fetching data.  
const LoadingComponent = ({inverted = true, content = 'Loading...'}: Props) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}

export default LoadingComponent
