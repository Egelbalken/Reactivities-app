import React from 'react'
import { Divider, Header, Icon, Segment } from 'semantic-ui-react'

const WhyComponent = () => {
    return (
            <Segment color='blue'>
          <Header>Why this site<span><Icon name='question circle'/></span></Header>
          <Divider inverted />
            This project is all about learning and master the React typeScript Package. 
            This Site is built upon the princip of "Clean Architecture pattern".
            This means that we bild the site in parts not realted to each part.
            We have a API C# backend and a typeScript API center whit a TSX(typeScript)
            frontend react component view.
            </Segment>
    )
}

export default WhyComponent
