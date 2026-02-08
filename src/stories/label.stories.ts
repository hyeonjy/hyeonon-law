import Label from "@/components/ui/label";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Text/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: { control: "text", description: "label의 for 속성" },
    children: { control: "text", description: "label의 내용" },
    showIcon: {
      control: "boolean",
      description: "label 옆에 필수 아이콘(*) 표시 여부",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "email",
    children: "이메일 ",
  },
};

export const WithIcon: Story = {
  args: {
    htmlFor: "email",
    children: "이메일 ",
    showIcon: true,
  },
};
