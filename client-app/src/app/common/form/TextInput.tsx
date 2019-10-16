import React from 'react';
import { FormFieldProps, FormField, Label } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps{}

const TextInput: React.FC<IProps> = ({input, width, type, placeholder, meta: {touched, error}}) => {
    return (
        <FormField error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    )
}


export default TextInput
