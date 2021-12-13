import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { CheckboxProps, Form, Label, Checkbox } from 'semantic-ui-react';

interface IProps
  extends Omit<FieldRenderProps<string, HTMLInputElement>, 'input'>,
  CheckboxProps {}

const CheckBoxInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  console.log(input);
  const {
    checked,
    value,
    inputType,
    name,
    onBlur,
    onChange,
    onFocus,
  } = input;
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <Checkbox
        toggle
        checked={checked}
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        label='Make activity private'
        type={inputType}
        placeholder={placeholder}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default CheckBoxInput;
