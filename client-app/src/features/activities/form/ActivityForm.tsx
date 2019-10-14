import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, FormInput, FormTextArea, Card, ButtonGroup, Button, Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, loadActivity, activity: initialFormState, clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(
                () => initialFormState && setActivity(initialFormState)
            );
        };

        return () => {
            clearActivity()
        };
    }, [loadActivity, clearActivity, initialFormState, match.params.id, activity.id.length]);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    const handeInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            onChange={handeInputChange}
                            name='title'
                            placeholder='Title'
                            value={activity.title}
                        />
                        <FormTextArea
                            onChange={handeInputChange}
                            name='description'
                            placeholder='Description'
                            value={activity.description}
                        />
                        <FormInput
                            onChange={handeInputChange}
                            name='category'
                            placeholder='Category'
                            value={activity.category}
                        />
                        <FormInput
                            onChange={handeInputChange}
                            name='date'
                            type='datetime-local'
                            placeholder='Date'
                            value={activity.date}
                        />
                        <FormInput
                            onChange={handeInputChange}
                            name='city'
                            placeholder='City'
                            value={activity.city}
                        />
                        <FormInput
                            onChange={handeInputChange}
                            name='venue'
                            placeholder='Venue'
                            value={activity.venue}
                        />
                        <Card.Content extra>
                            <ButtonGroup widths={2}>
                                <Button loading={submitting} basic positive type='submit' content='Submit' />
                                <Button onClick={() => history.push('/activities')} basic negative type='button' content='Cancel' />
                            </ButtonGroup>
                        </Card.Content>
                    </Form>
                </Segment>
            </GridColumn>
            <GridColumn width={6}>

            </GridColumn>
        </Grid>


    )
}

export default observer(ActivityForm);
