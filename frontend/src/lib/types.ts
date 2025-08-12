export type User = {
  _id: string;
  username: string;
  avatar: string;
};

export type Conversation = {
  _id: string;
  isGroup: boolean;
  users: User[];
};

export type Message = {
  _id: string;
  body: string;
  conversation: string;
  sender: string;
  seenBy: User[];
};
