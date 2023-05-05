import type { Meta, StoryObj } from "@storybook/react";

import Form from "./index";

const meta: Meta<typeof Form> = {
  title: "Pages/Form",
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: () => <Form />,
};
