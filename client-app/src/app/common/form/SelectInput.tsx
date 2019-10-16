import React from 'react';
import { FormFieldProps, FormField, Label, Select } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps{}

const SelectInput: React.FC<IProps> = ({input, width, options, placeholder, meta: {touched, error}}) => {
    return (
        <FormField error={touched && !!error} width={width}>
        <Select
            value={input.value}
            onChange={(e, data) => input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
        />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </FormField>
    )
}


export default SelectInput;