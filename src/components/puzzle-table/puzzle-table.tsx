'use client';
import { Puzzle } from "@/hooks/usePuzzle";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef } from "react";

type PuzzleTableProps = {
  puzzle: Puzzle;
}

export function PuzzleTable({ puzzle }: PuzzleTableProps) {
  const [width, height] = useWindowSize();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas.current!.getContext('2d')!;
    for (const piece of Object.values(puzzle)) {
      context.drawImage(piece.image, ...piece.position);
    }
  }, [puzzle, width, height]);

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
    />
  );
};
