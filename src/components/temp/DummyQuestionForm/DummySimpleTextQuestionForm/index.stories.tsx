import type { Meta, StoryObj } from "@storybook/react";

import { DummySimpleTextQuestion } from "./index";

const meta: Meta<typeof DummySimpleTextQuestion> = {
  title: "Components/DummyQuestionForm/DummySimpleTextQuestion",
  component: DummySimpleTextQuestion,
};

export default meta;
type Story = StoryObj<typeof DummySimpleTextQuestion>;

export const Primary: Story = {
  render: () => <DummySimpleTextQuestion />,
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
