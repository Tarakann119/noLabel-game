export type TAvatarProps = {
  size?: 'default' | 'small' | 'header';
  className?: string;
  isLink?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>;
