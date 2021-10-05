import React from 'react'
import { Divider, Header, Icon, Segment } from 'semantic-ui-react'

const WhyComponent = () => {
    return (
            <Segment color='blue'>
          <Header>Why this site<span><Icon name='question circle'/></span></Header>
            <Divider inverted />
                <p>
                    This project is all about learning and master the React typeScript Package. 
                    This Site is built upon the princip of "Clean Architecture pattern".
                    This means that we bild the site in parts not realted to each part.
                    We have a API C# backend and a typeScript API center whit a TSX(typeScript)
                    frontend react component view.
                </p>
                <Divider inverted />      
                <Header>
                    What is it about<span><Icon name='question circle'/></span>
                </Header>
                <Divider inverted />
                    <p>
                        This project is inspired from a Udemy course.
                        The goal is to learn C# backend API and TS javaScript API and frontend 
                        typeScript React. 
                    </p>
                    <h5>
                        Project containes
                    </h5>
                    <ul>
                        <li>C#</li>
                        <li>React ver.17 in TS</li>
                        <li>API for backend and fronend</li>
                        <li>Chat SingalR</li>
                        <li>Mobex data</li>
                        <li>Sementic ui</li>
                        <li>Identity</li>
                    </ul>
            </Segment>
    )
}

export default WhyComponent
