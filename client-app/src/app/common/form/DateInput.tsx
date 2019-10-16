import React from 'react';
import { FormFieldProps, FormField, Label } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';
import { DateTimePicker } from 'react-widgets';

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps{}

const DateInput: React.FC<IProps> = ({input, width, type, placeholder, date = false, time = false, meta: {touched, error}, ...rest}) => {
    return (
        <FormField error={touched && !!error} type={type} width={width}>
        <DateTimePicker
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onKeyDown={(e) => e.preventDefault()}
            date={date}
            time={time}
            {...rest}
        />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    )
}

export default DateInput
