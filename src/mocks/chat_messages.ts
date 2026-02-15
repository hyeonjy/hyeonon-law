import { users } from "./users";
import { chatRooms } from "./chat_rooms";

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export const chatMessages: ChatMessage[] = [
  // Room 1 (User 1 vs Admin)
  {
    id: "cm1ebc99-9c0b-4ef8-bb6d-6bb9bd380cm1",
    room_id: chatRooms[0].id,
    sender_id: users[1].id, // User 1
    content: "안녕하세요, 상담 문의 드립니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
  },
  {
    id: "cm2ebc99-9c0b-4ef8-bb6d-6bb9bd380cm2",
    room_id: chatRooms[0].id,
    sender_id: users[0].id, // Admin
    content: "안녕하세요. 어떤 부분이 궁금하신가요?",
    created_at: new Date(Date.now() - 1000 * 60 * 9).toISOString(), // 9 mins ago
  },
  {
    id: "cm3ebc99-9c0b-4ef8-bb6d-6bb9bd380cm3",
    room_id: chatRooms[0].id,
    sender_id: users[1].id, // User 1
    content: "상담 비용이 궁금합니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 mins ago
  },
  {
    id: "cm4ebc99-9c0b-4ef8-bb6d-6bb9bd380cm4",
    room_id: chatRooms[0].id,
    sender_id: users[0].id, // Admin
    content: "상담 비용은 시간당 비용으로 책정됩니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(), // 7 mins ago
  },

  // Room 2 (User 2 vs Admin)
  {
    id: "cm5ebc99-9c0b-4ef8-bb6d-6bb9bd380cm5",
    room_id: chatRooms[1].id,
    sender_id: users[2].id, // User 2
    content: "비용 견적 문의드립니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: "cm6ebc99-9c0b-4ef8-bb6d-6bb9bd380cm6",
    room_id: chatRooms[1].id,
    sender_id: users[0].id, // Admin
    content: "비용 견적은 상담 후 안내해드립니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(), // 4 mins ago
  },
  {
    id: "cm7ebc99-9c0b-4ef8-bb6d-6bb9bd380cm7",
    room_id: chatRooms[1].id,
    sender_id: users[2].id, // User 2
    content: "네, 알겠습니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
  },
];
