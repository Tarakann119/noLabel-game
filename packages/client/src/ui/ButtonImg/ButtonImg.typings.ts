export type ButtonImgProps = {
  variant: 'close' | 'logout' | 'up' | 'github' | 'telegram';
  onClick?: () => void;
  key?: string;
} & React.BaseHTMLAttributes<HTMLHeadingElement>;
