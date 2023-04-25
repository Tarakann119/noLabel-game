import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  text: string;
  view?: 'primary' | 'secondary' | 'ghost';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
