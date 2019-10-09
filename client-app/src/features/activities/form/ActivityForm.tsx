import React, { useState, FormEvent } from 'react'
import { Segment, Form, FormInput, FormTextArea, Card, ButtonGroup, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';

interface IProp {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm: React.FC<IProp> = ({ setEditMode, activity: initialFormState, createActivity, editActivity, submitting }) => {

    const initialiseForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initialiseForm);

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const handeInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    return (
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
                        <Button onClick={() => setEditMode(false)} basic negative type='button' content='Cancel' />
                    </ButtonGroup>
                </Card.Content>
            </Form>
        </Segment>
    )
}

export default ActivityForm
