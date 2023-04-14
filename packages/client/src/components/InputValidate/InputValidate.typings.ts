import { FieldInputProps, FieldMetaProps } from 'formik';

export type TInputValidate = {
  disabled?: string;
  type: 'text' | 'password' | 'email' | 'tel' | 'search';
  placeholder?: string;
  label?: string;
  className?: string;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
};
