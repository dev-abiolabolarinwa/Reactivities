import React from 'react'
import { IActivity } from '../../../app/models/activity';
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react';

interface IProps {
    activities: IActivity[]
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity, deleteActivity }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>

                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(activity.id)}
                                    floated='right'
                                    content='View'
                                    color='blue'
                                />
                                <Button
                                    onClick={() => deleteActivity(activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
}

export default ActivityList
