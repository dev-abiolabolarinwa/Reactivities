import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { activity, loadActivity, loadingInitial } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id).catch(() => {
            history.push('/notfound');
        });
    }, [loadActivity, match.params.id, history]);

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />;

    if (!activity) return <h1>Activity Not Found</h1>;

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar />
            </GridColumn>
        </Grid>
    );
}

export default observer(ActivityDetails);
