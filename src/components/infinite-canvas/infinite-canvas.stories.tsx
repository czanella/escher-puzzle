import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InfiniteCanvas as InfiniteCanvasComponent } from "./infinite-canvas";

const meta: Meta<typeof InfiniteCanvasComponent> = {
  title: 'Infinite Canvas',
  component: InfiniteCanvasComponent,
  parameters: {
    viewport: {
      defaultViewport: 'fullscreen',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const LeaderboardGameTitle:Story = {
  args: {
  },
};
