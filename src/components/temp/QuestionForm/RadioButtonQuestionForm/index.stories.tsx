import type { Meta, StoryObj } from "@storybook/react";

import { RadioButtonQuestionForm } from "./index";

const meta: Meta<typeof RadioButtonQuestionForm> = {
  title: "Components/QuestionForm/RadioButtonQuestionForm",
  component: RadioButtonQuestionForm,
};

export default meta;
type Story = StoryObj<typeof RadioButtonQuestionForm>;

export const Primary: Story = {
  render: (args) => <RadioButtonQuestionForm {...args} />,
  args: {
    질문순서: 0,
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
