import type { Meta, StoryObj } from "@storybook/react";

import { DummyCheckBoxQuestionForm } from "./index";

const meta: Meta<typeof DummyCheckBoxQuestionForm> = {
  title: "Components/DummyQuestionForm/DummyCheckBoxQuestionForm",
  component: DummyCheckBoxQuestionForm,
};

export default meta;
type Story = StoryObj<typeof DummyCheckBoxQuestionForm>;

export const Primary: Story = {
  render: () => <DummyCheckBoxQuestionForm />,

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
