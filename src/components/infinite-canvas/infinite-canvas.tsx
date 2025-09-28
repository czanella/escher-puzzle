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
} & React.ComponentPropsWithoutRef<'canvas'>;

export function InfiniteCanvas({ width, height, draw, ...props }: InfiniteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [anchorX, setAnchorX] = useState<number>();
  const [anchorY, setAnchorY] = useState<number>();
  const [anchor, setAnchor] = useState<DOMMatrix>();

  const setPositionAndScale = useCallback((x: number = 0, y: number = 0, scale: number = 1) => {
    const minX = -x;
    const minY = -y;
    const maxX = minX + scale*width;
    const maxY = minY + scale*height;

    const context = canvasRef.current!.getContext('2d')!;
    context.resetTransform();
    context.clearRect(0, 0, width, height);
    context.setTransform(scale, 0, 0, scale, x, y);
    draw({ minX, minY, maxX, maxY, context });
  }, [draw, height, width]);

  useEffect(() => {
    setPositionAndScale();
  }, [setPositionAndScale]);

  useEffect(() => {
    if (anchor === undefined || anchorX === undefined || anchorY === undefined) {
      return;
    }

    const onMove = (ev: MouseEvent) => {
      const { a: scale, e: x, f: y } = anchor;
      setPositionAndScale(
        (ev.clientX - anchorX + x),
        (ev.clientY - anchorY + y),
        scale,
      );
    }

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [anchor, anchorX, anchorY, setPositionAndScale]);

  const onMouseDragStart = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setAnchorX(e.clientX);
      setAnchorY(e.clientY);
      setAnchor(canvasRef.current!.getContext('2d')!.getTransform());
    },
    [],
  );

  const onMouseDragStop = useCallback(() => {
    setAnchorX(undefined);
    setAnchorY(undefined);
    setAnchor(undefined);
  }, []);

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
      onMouseDown={onMouseDragStart}
      onMouseUp={onMouseDragStop}
      onMouseLeave={onMouseDragStop}
      onTouchStart={onTouchDragStart}
    />
  );
}
