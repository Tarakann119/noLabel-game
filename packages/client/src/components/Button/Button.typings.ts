import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  view?: 'primary' | 'secondary' | 'outline' | 'icon';
  type?: 'submit' | 'button' | 'reset';
  icon?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
