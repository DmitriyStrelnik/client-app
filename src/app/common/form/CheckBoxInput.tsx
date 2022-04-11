import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { CheckboxProps, Form, Label, Checkbox } from 'semantic-ui-react';

interface IProps
  extends Omit<FieldRenderProps<string, HTMLInputElement>, 'input'>,
    CheckboxProps {}

const CheckBoxInput: React.FC<IProps> = ({
  width,
  placeholder,
  meta: { touched, error },
  ...props
}) => {
  const {
    input: { value, ...input },
    type,
    ...rest
  } = props;
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <Checkbox
        toggle
        {...input}
        {...rest}
        value={value}
        onChange={(evt, { checked }) => {
          input.onChange({ target: { type: 'checkbox', value, checked } });
        }}
        label='Make activity private'
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
