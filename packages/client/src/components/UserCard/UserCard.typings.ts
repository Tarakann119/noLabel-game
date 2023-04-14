export type usercardprops = {
  variant: 'header' | 'leaderboard';
  buttonVariant?: string;
  avatarUrl?: string;
  userName: string;
  clickCard?: () => void;
  clickButton?: () => void;
};
