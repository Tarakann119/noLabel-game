export type ButtonImgProps = {
  variant: 'close' | 'logout' | 'up' | 'github' | 'telegram';
  onClick?: () => void;
} & React.BaseHTMLAttributes<HTMLHeadingElement>;
