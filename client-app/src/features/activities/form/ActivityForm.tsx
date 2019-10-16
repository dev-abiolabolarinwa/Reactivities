import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid, GridColumn, FormGroup } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators } from 'revalidate';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(11)({message: 'Description needs to be at least 10 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, loadActivity } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id, setLoading]);

    const handleFinalSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        
        if (activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalSubmit}
                        render={(({ handleSubmit, invalid, pristine }) =>
                            <Form
                                onSubmit={handleSubmit}
                                loading={loading}
                            >
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    rows={6}
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    name='category'
                                    placeholder='Category'
                                    value={activity.category}
                                    component={SelectInput}
                                    options={category}
                                />
                                <FormGroup widths='equal'>
                                    <Field
                                        name='date'
                                        placeholder='Date'
                                        date={true}
                                        value={activity.date}
                                        component={DateInput}
                                    />
                                    <Field
                                        name='time'
                                        placeholder='Time'
                                        time={true}
                                        value={activity.time}
                                        component={DateInput}
                                    />
                                </FormGroup>
                                <Field
                                    name='city'
                                    placeholder='City'
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue}
                                    component={TextInput}
                                />
                                <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' basic positive type='submit' content='Submit' />
                                <Button onClick={() => history.push(`/activities/${activity.id}`)} disabled={loading} basic negative type='button' content='Cancel' floated='right' />
                            </Form>
                        )}
                    />
                </Segment>
            </GridColumn>
            <GridColumn width={6}>

            </GridColumn>
        </Grid>


    )
}

export default observer(ActivityForm);
