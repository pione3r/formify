import type { Meta, StoryObj } from "@storybook/react";

import { SimpleTextQuestionForm } from "./index";

const meta: Meta<typeof SimpleTextQuestionForm> = {
  title: "Components/QuestionForm/SimpleTextQuestionForm",
  component: SimpleTextQuestionForm,
};

export default meta;
type Story = StoryObj<typeof SimpleTextQuestionForm>;

export const Primary: Story = {
  render: (args) => <SimpleTextQuestionForm {...args} />,
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
