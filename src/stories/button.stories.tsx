import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../components/ui/button";
import { fn } from "storybook/test";

const meta = {
  title: "Buttons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "버튼에 표시될 텍스트",
    },
    variant: {
      control: "select",
      options: ["primary", "outline"],
      description: "버튼 스타일 종류 (primary/outline)",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태 여부",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "예약하기",
    variant: "primary",
  },
};

export const Outline: Story = {
  args: {
    label: "로그인하기",
    variant: "outline",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: "예약하기",
    variant: "primary",
    disabled: true,
  },
};

export const OutlineDisabled: Story = {
  args: {
    label: "로그인하기",
    variant: "outline",
    disabled: true,
  },
};
