import React from 'react'
import { Item, Button, SegmentGroup, Segment, ItemImage, Icon, ItemGroup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {

    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <ItemImage size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Reactivities...
                        </Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date, 'h:mm a')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary >
                Attendees will go here
            </Segment>
            <Segment clearing >
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated='right'
                    content='View'
                    color='blue'
                />
            </Segment>
        </SegmentGroup>

    )
}

export default observer(ActivityListItem);
