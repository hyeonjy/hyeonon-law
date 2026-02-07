import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorMessage } from "../components/ui/error-message";

const meta = {
  title: "Text/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "표시할 에러 메시지 텍스트",
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "이메일 형식이 올바르지 않습니다.",
  },
};
