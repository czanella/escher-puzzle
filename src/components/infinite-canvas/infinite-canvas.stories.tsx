import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DrawFunction, InfiniteCanvas as InfiniteCanvasComponent } from "./infinite-canvas";
import teapot from './story-assets/teapot.jpg';

const teapotImage = new Image();
teapotImage.src = teapot.src;
teapotImage.decode();

const drawMapping: Record<string, DrawFunction> = {
  'Single Photo': ({ context }) => {
    context.drawImage(teapotImage, 0, 0);
  },
  'Infinite Photos': ({ context, minX, minY, maxX, maxY }) => {
    const w = maxX - minX;
    const h = maxY - minY;
    const startX = Math.floor(minX / teapotImage.width);
    const startY = Math.floor(minY / teapotImage.height);
    const countX = Math.ceil(w / teapotImage.width) + 1;
    const countY = Math.ceil(h / teapotImage.height) + 1;

    for (let i = 0; i < countY; ++i) {
      for (let j = 0; j < countX; ++j) {
        context.drawImage(
          teapotImage,
          (startX + j)*teapotImage.width,
          (startY + i)*teapotImage.height,
        );
      }
    }
  },
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
    scale: 1,
    // @ts-expect-error here, 'draw' represents the ID of the function, not the function itself
    draw: "Single Photo",
  },
};
