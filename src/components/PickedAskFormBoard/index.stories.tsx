import type { Meta, StoryObj } from "@storybook/react";

import { PickedAskFormBoard } from "./index";
import { TextAskForm } from "../AskForm/TextAskForm";

const meta: Meta<typeof PickedAskFormBoard> = {
  title: "PickedAskFormBoard",
  component: PickedAskFormBoard,
};

export default meta;
type Story = StoryObj<typeof PickedAskFormBoard>;

export const Primary: Story = {
  render: (args) => <PickedAskFormBoard {...args} />,
  args: {
    children: [
      { id: "0", type: "text", askTitle: "더미질문" },
      { id: "1", type: "text", askTitle: "더미질문" },
    ].map((질문, index) => (
      <TextAskForm key={질문.id} index={index} 질문={질문} />
    )),
  },
};
