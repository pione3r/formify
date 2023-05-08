import type { Meta, StoryObj } from "@storybook/react";

import { DummyRadioButtonQuestionForm } from "./index";

const meta: Meta<typeof DummyRadioButtonQuestionForm> = {
  title: "Components/DummyQuestionForm/DummyRadioButtonQuestionForm",
  component: DummyRadioButtonQuestionForm,
};

export default meta;
type Story = StoryObj<typeof DummyRadioButtonQuestionForm>;

export const Primary: Story = {
  render: () => <DummyRadioButtonQuestionForm />,

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
