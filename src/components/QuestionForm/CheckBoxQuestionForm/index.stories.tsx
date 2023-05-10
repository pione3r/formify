import type { Meta, StoryObj } from "@storybook/react";

import { CheckBoxQuestionForm } from "./index";

const meta: Meta<typeof CheckBoxQuestionForm> = {
  title: "Components/QuestionForm/CheckBoxQuestionForm",
  component: CheckBoxQuestionForm,
};

export default meta;
type Story = StoryObj<typeof CheckBoxQuestionForm>;

export const Primary: Story = {
  render: (args) => <CheckBoxQuestionForm {...args} />,
  args: {
    선택지목록: ["테스트1", "테스트2", "테스트3"],
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "rgb(245, 245, 247)",
          maxWidth: "50rem",
          minHeight: "50rem",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
