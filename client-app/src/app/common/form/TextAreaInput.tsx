import React from 'react';
import { FormFieldProps, FormField, Label } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps{}

const TextAreaInput: React.FC<IProps> = ({input, width, rows, placeholder, meta: {touched, error}}) => {
    return (
        <FormField error={touched && !!error} width={width}>
            <textarea {...input} placeholder={placeholder} rows={rows}/>
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    )
}


export default TextAreaInput
