import React from 'react';
import { observer } from 'mobx-react-lite';
import { SegmentGroup, Segment, ItemGroup, Item, ItemContent, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const activityImageStyle = {
    filter: 'brightness(30%)'
  };
  
  const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

const ActivityDetailedHeader:React.FC<{activity: IActivity}> = ({ activity }) => {
    return (
        <SegmentGroup>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image 
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    fluid
                    style={activityImageStyle}
                />
                <Segment style={activityImageTextStyle} basic>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date, 'eeee do MMMM')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>Manage Event</Button>
            </Segment>
        </SegmentGroup>
    );
}

export default observer(ActivityDetailedHeader);
