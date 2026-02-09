export interface User {
  id: string;
  is_admin: boolean;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const users: User[] = [
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // Fixed UUID for verify
    is_admin: true,
    name: "관리자",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22", // Fixed UUID for verify
    is_admin: false,
    name: "유저1",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=User1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33", // Fixed UUID for verify
    is_admin: false,
    name: "유저2",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=User2",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
