import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Segment, SegmentGroup, GridColumn, Icon } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
        <SegmentGroup>
            <Segment attached='top'>
                <Grid>
                    <GridColumn width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </GridColumn>
                    <GridColumn width={15}>
                        <p>{activity.description}</p>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <GridColumn width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </GridColumn>
                    <GridColumn width={15}>
                        <span>{activity.date}</span>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <GridColumn width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </GridColumn>
                    <GridColumn width={11}>
                        <span>
                            {activity.venue}, {activity.city}
                        </span>
                    </GridColumn>
                </Grid>
            </Segment>
        </SegmentGroup>
    );
}

export default observer(ActivityDetailedInfo);
