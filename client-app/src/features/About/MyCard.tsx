import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const MyCard = () => {
    return (
        <Card position="center">
        <Image src='/assets/kent2020.jpg' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Kent Jakobsson</Card.Header>
          <Card.Meta>Developer React and C#</Card.Meta>
          <Card.Description>
            My name is Kent Jakobsson from Sweden!
            Student at C# and React.
          </Card.Description>
        </Card.Content>
      </Card>
    )
}

export default MyCard
