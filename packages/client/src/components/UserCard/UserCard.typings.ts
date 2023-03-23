export type UserCardProps = {
  variant: 'header' | 'leaderboard';
  buttonVariant?: string;
  avatarUrl?: string;
  userName: string;
  clickCard?: () => void;
  clickButton?: () => void;
};
