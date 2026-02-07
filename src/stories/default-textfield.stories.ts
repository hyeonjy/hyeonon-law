import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DefaultTextField } from "../components/ui/default-textfield";
import { fn } from "storybook/test";

const meta = {
  title: "TextFields/DefaultTextField",
  component: DefaultTextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "입력 요소의 ID",
    },
    label: {
      control: "text",
      description: "입력 필드 위에 표시될 라벨 텍스트",
    },
    showIcon: {
      control: "boolean",
      description: "라벨 옆 필수 입력 아이콘(*) 표시 여부",
    },
    isError: {
      control: "boolean",
      description: "에러 상태 여부",
    },
    errorMessage: {
      control: "text",
      description: "에러 상태일 때 표시할 에러 메시지",
    },
    value: {
      control: "text",
      description: "입력 값",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "tel", "number"],
      description: "입력 타입",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DefaultTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "name",
    label: "이름",
    value: "",
  },
};

export const WithRequiredIcon: Story = {
  args: {
    htmlFor: "name",
    label: "성함",
    showIcon: true,
    value: "",
  },
};

export const WithError: Story = {
  args: {
    htmlFor: "email",
    label: "이메일",
    showIcon: true,
    isError: true,
    errorMessage: "이메일 형식이 올바르지 않습니다.",
    type: "email",
    value: "invalid-email",
  },
};

export const Password: Story = {
  args: {
    htmlFor: "password",
    label: "비밀번호",
    showIcon: true,
    type: "password",
    value: "password123",
  },
};
