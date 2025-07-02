export class Puzzle {
  maskPixels: ImageData;

  constructor(puzzle: HTMLImageElement, mask: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = mask.width;
    canvas.height = mask.height;

    const canvasContext = canvas.getContext('2d')!;
    canvasContext.drawImage(mask, 0, 0);

    this.maskPixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height, {
      colorSpace: "srgb",
    });
  }
}