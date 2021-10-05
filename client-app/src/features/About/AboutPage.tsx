import { Grid, Image, Segment } from 'semantic-ui-react'
import MyCard from './MyCard'
import WhyComponent from './WhyComponent'

const AboutPage = () => {
    return (
        <Segment>
            <Grid>
            <Grid.Column width={4} styles={{align:'center'}}>
                    <MyCard/>
            </Grid.Column>
            <Grid.Column width={12}>
                    <WhyComponent />
            </Grid.Column>
            <Grid.Column width={8}>
            <Image src='/assets/826-8263457_react-with-typescript-react.png' />
            </Grid.Column>
        </Grid>
        </Segment>
    )
}

export default AboutPage
