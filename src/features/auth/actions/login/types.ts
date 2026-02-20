export type LoginActionState = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};
