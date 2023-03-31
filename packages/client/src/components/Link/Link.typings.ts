export type LinkProps = {
  href: string;
  text: string;
  view?: 'primary' | 'secondary' | 'ghost';
  withSound?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
