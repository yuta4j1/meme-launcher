import type { Meta, StoryObj } from "@storybook/react";
// import { within, userEvent, expect } from "@storybook/test";

import { UploadModal } from "./UploadModal";

const meta = {
  title: "UI/UploadModal",
  component: UploadModal,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof UploadModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
  //   play: async ({ canvasElement }) => {
  //     const canvas = within(canvasElement);
  //     const loginButton = canvas.getByRole('button', { name: /Log in/i });
  //     await expect(loginButton).toBeInTheDocument();
  //     await userEvent.click(loginButton);
  //     await expect(loginButton).not.toBeInTheDocument();

  //     const logoutButton = canvas.getByRole('button', { name: /Log out/i });
  //     await expect(logoutButton).toBeInTheDocument();
  //   },
};
