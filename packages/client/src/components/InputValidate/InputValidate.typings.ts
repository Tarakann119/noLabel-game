/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldInputProps, FieldMetaProps } from 'formik';

export type TInputValidateProps = {
  disabled?: boolean;
  type: 'text' | 'password' | 'email' | 'tel' | 'search';
  placeholder?: string;
  label?: string;
  className?: string;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
};
