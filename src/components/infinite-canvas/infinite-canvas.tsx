'use client';

import { useCallback, useEffect, useRef, useState } from "react";

type DrawFunctionParams = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  context: CanvasRenderingContext2D;
};

export type DrawFunction = (params: DrawFunctionParams) => void;

type InfiniteCanvasProps = {
  draw: DrawFunction;
  width: number;
  height: number;
  x?: number;
  y?: number;
  scale?: number;
} & React.ComponentPropsWithoutRef<'canvas'>;

export function InfiniteCanvas({
  width,
  height,
  draw,
  x,
  y,
  scale,
  ...props
}: InfiniteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Holds the state of the canvas on the moment that the user starts an interaction
  const [anchorX, setAnchorX] = useState<number>();
  const [anchorY, setAnchorY] = useState<number>();
  const [anchorTransform, setAnchorTransform] = useState<DOMMatrix>();

  // The main function. Sets position and scale of the infinite canvas and redraws it
  const setPositionAndScale = useCallback((newX: number = 0, newY: number = 0, newScale: number = 1) => {
    const minX = -newX;
    const minY = -newY;
    const maxX = minX + newScale*width;
    const maxY = minY + newScale*height;

    const context = canvasRef.current!.getContext('2d')!;
    context.resetTransform();
    context.clearRect(0, 0, width, height);
    context.setTransform(newScale, 0, 0, newScale, newX, newY);
    draw({ minX, minY, maxX, maxY, context });
  }, [draw, height, width]);

  // Redraws the canvas if the client is controlling it from the outside
  // Also ensures the initial draw
  useEffect(() => {
    setPositionAndScale(x, y, scale);
  }, [scale, setPositionAndScale, x, y]);

  // Callbacks to start and stop a drag using the mouse
  const startDrag = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setAnchorX(e.clientX);
      setAnchorY(e.clientY);
      setAnchorTransform(canvasRef.current!.getContext('2d')!.getTransform());
    },
    [],
  );

  const stopDrag = useCallback(() => {
    setAnchorX(undefined);
    setAnchorY(undefined);
    setAnchorTransform(undefined);
  }, []);

  // Handles the listener for when the user drags the content
  useEffect(() => {
    if (anchorTransform === undefined || anchorX === undefined || anchorY === undefined) {
      return;
    }

    const onMove = (ev: MouseEvent) => {
      setPositionAndScale(
        (ev.clientX - anchorX + anchorTransform.e),
        (ev.clientY - anchorY + anchorTransform.f),
        anchorTransform.a,
      );
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stopDrag);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [anchorTransform, anchorX, anchorY, setPositionAndScale, stopDrag]);

  const onTouchDragStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      console.log('Yay!', e);
    },
    [],
  );

  return (
    <canvas
      {...props}
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrag}
      onTouchStart={onTouchDragStart}
    />
  );
}
