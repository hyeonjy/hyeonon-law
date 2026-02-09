import { users } from "./users";

export interface ChatRoom {
  id: string;
  requester_id: string;
  created_at: string;
  updated_at: string;
}

export const chatRooms: ChatRoom[] = [
  {
    id: "cr1ebc99-9c0b-4ef8-bb6d-6bb9bd380cr1",
    requester_id: users[1].id, // Normal User 1
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cr2ebc99-9c0b-4ef8-bb6d-6bb9bd380cr2",
    requester_id: users[2].id, // Normal User 2
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
