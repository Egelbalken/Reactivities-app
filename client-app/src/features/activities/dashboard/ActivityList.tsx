import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';


const ActivityList = () => {
    const { activityStore } = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;

        const[target, setTarget] = useState("");

        const deleteActivityHanlder = (
            event: SyntheticEvent<HTMLButtonElement>, 
            id:string) => {
            setTarget(event.currentTarget.name);
            deleteActivity(id);
        }


    return (
        <Fragment>
            <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                onClick={()=> activityStore.selectActivity(activity.id)}
                                floated="right" 
                                content='View' 
                                color='blue' />
                                <Button 
                                onClick={(event)=> deleteActivityHanlder(event, activity.id)}
                                name={activity.id}
                                floated="right" 
                                content='Delete' 
                                color='red' 
                                loading={loading && target === activity.id}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>))}
            </Item.Group>
            </Segment>   
        </Fragment>
    )
}

export default observer(ActivityList)
