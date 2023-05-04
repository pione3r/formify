import type { Meta, StoryObj } from "@storybook/react";

import { DummyTextAskForm } from "./index";

const meta: Meta<typeof DummyTextAskForm> = {
  title: "DummyTextAskForm",
  component: DummyTextAskForm,
};

export default meta;
type Story = StoryObj<typeof DummyTextAskForm>;

export const Primary: Story = {
  render: () => <DummyTextAskForm />,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "rgb(245, 245, 247)",
          maxWidth: "50rem",
          minHeight: "50rem",
          margin: "0 auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
