export type TAuthorItemProps = {
  className?: string;
  name: string;
  img: string;
  links: TAuthorItemLink[];
};

type TAuthorItemLink = {
  type: 'github' | 'telegram';
  url: string;
};
