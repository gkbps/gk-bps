export interface Notification {
  tcode: string;
  id: string;
  icon: string;
  desc: string;
  url: string;
  data: {};
  username: string;
  creator: string;
  isMark: boolean;
  created_at: Date;
}
