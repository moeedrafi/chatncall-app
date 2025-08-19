import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

type Auth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  connectSocket: () => void;
};

interface ServerToClientEvents {
  "new message": (message: string) => void;
  "user typing": (userId: string, conversationId: string) => void;
  "user online": (userId: string) => void;
  "user offline": (userId: string) => void;
}

interface ClientToServerEvents {
  "join conversation": (conversationId: string) => void;
  "leave conversation": (conversationId: string) => void;
  "send message": (conversationId: string, message: string) => void;
  "user typing": (conversationId: string) => void;
}

export const useAuthStore = create<Auth>((set, get) => ({
  user: null,
  isLoggedIn: false,
  socket: null,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:8000",
      {
        query: {
          userId: user._id,
        },
      }
    );
    socket.connect();

    set({ socket: socket });
  },
}));
