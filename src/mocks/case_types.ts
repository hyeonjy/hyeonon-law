export interface CaseType {
  id: string;
  name: string;
  created_at: string;
}

export const caseTypes: CaseType[] = [
  {
    id: "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44",
    name: "형사",
    created_at: new Date().toISOString(),
  },
  {
    id: "e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55",
    name: "민사",
    created_at: new Date().toISOString(),
  },
  {
    id: "f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66",
    name: "기업",
    created_at: new Date().toISOString(),
  },
  {
    id: "a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a77",
    name: "행정",
    created_at: new Date().toISOString(),
  },
];
