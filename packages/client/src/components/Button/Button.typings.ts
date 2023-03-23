export type ButtonProps = {
  text: string;
  view?: 'primary' | 'secondary' | 'ghost';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
