export type LinkProps = {
  href: string;
  text: string;
  view?: 'primary' | 'secondary' | 'ghost';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
