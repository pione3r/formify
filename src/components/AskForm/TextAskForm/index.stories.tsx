import type { Meta, StoryObj } from "@storybook/react";

import { TextAskForm } from "./index";

const meta: Meta<typeof TextAskForm> = {
  title: "TextAskForm",
  component: TextAskForm,
};

export default meta;
type Story = StoryObj<typeof TextAskForm>;

export const Primary: Story = {
  render: () => <TextAskForm />,
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
