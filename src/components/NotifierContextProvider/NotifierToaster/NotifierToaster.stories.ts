import type { Meta, StoryObj } from "@storybook/react";
// import { within, userEvent, expect } from "@storybook/test";

import { NotifierToaster } from "./NotifierToaster";

const meta = {
  title: "UI/NotifierToaster",
  component: NotifierToaster,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof NotifierToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Success: Story = {
  args: {
    state: {
      type: "success",
      show: true,
      color: "#5cb85c",
      message: "画像のアップロードが完了しました",
    },
    handleOpenChange: () => {},
  },
};

export const Error: Story = {
  args: {
    state: {
      type: "error",
      show: true,
      color: "#ef5350",
      message: "画像のアップロードに失敗しました",
    },
    handleOpenChange: () => {},
  },
};
