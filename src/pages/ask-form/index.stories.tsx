import type { Meta, StoryObj } from "@storybook/react";

import AskForm from "./index";

const meta: Meta<typeof AskForm> = {
  title: "Pages/AskForm",
  component: AskForm,
};

export default meta;
type Story = StoryObj<typeof AskForm>;

export const Primary: Story = {
  render: () => <AskForm />,
};
