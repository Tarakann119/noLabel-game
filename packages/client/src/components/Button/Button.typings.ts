export type TButtonProps = {
  view?: 'primary' | 'secondary' | 'outline' | 'icon';
  type?: 'submit' | 'button' | 'reset';
  icon?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
