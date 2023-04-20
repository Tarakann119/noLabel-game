export type TPostProps = {
  isTopicStarter?: boolean;
  data: {
    id: number;
    title?: string;
    created_at: string;
    text: string;
    user: {
      login: string;
      avatar: string;
    };
  };
};
