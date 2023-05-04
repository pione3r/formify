import type { Meta, StoryObj } from "@storybook/react";

import { AskFormBoard } from "./index";
import { DummyTextAskForm } from "../DummyAskForm/TextAskForm";

const meta: Meta<typeof AskFormBoard> = {
  title: "AskFormBoard",
  component: AskFormBoard,
};

export default meta;
type Story = StoryObj<typeof AskFormBoard>;

export const Primary: Story = {
  render: (args) => <AskFormBoard {...args} />,
  args: {
    children: <DummyTextAskForm />,
  },
};
