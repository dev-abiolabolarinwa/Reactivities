import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activity Filters</h2>
            </GridColumn>
        </Grid>
    )
}

export default observer(ActivityDashboard);
