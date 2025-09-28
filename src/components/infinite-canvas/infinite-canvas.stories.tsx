import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DrawFunction, InfiniteCanvas as InfiniteCanvasComponent } from "./infinite-canvas";
import teapot from './story-assets/teapot.jpg';

const teapotImage = new Image();
teapotImage.src = teapot.src;
teapotImage.decode();

const drawMapping: Record<string, DrawFunction> = {
  'Single Photo': ({ context }) => { context.drawImage(teapotImage, 0, 0) },
};

const meta: Meta<typeof InfiniteCanvasComponent> = {
  title: 'Infinite Canvas',
  component: InfiniteCanvasComponent,
  parameters: {
    viewport: {
      defaultViewport: 'fullscreen',
    },
  },
  argTypes: {
    draw: {
      control: { type: 'select' },
      options: Object.keys(drawMapping),
      mapping: drawMapping,
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const LeaderboardGameTitle:Story = {
  args: {
    width: 550,
    height: 400,
    draw: drawMapping['Single Photo'],
  },
};
