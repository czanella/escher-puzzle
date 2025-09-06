import { useEffect, useMemo, useState } from "react";

type PuzzlePieceJson = {
  image: string;
  position: [number, number];
  neighbors: number[];
}

type PuzzleJson = Record<string, PuzzlePieceJson>;

type PuzzlePiece = {
  image: HTMLImageElement;
  position: [number, number];
  neighbors: PuzzlePiece[];
}

export type Puzzle = Record<number, PuzzlePiece>;


export const usePuzzle = (puzzleId: string) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loaded, setLoaded] = useState<boolean[]>([]);

  const loadedCount = useMemo<[number, number]>(() => [
    loaded.filter(x => x).length,
    loaded.length,
  ], [loaded]);

  useEffect(() => {
    fetch(`/puzzles/${puzzleId}/pieces.json`)
      .then(r => r.json())
      .then((pieces: PuzzleJson) => {
        const result: Puzzle = {};
        setLoaded(Array.from({ length: Object.keys(pieces).length }).map(() => false));
        for (const [key, pieceData] of Object.entries(pieces)) {
          const pieceKey = parseInt(key);
          const newPiece: PuzzlePiece = {
            image: new Image(),
            position: pieceData.position,
            neighbors: [],
          };
          newPiece.image.src = `/puzzles/${puzzleId}/${pieceData.image}`;
          newPiece.image.decode().then(() => {
            setLoaded(loaded => loaded.map((x, i) => i === pieceKey - 1 ? true : x));
          });
          result[pieceKey] = newPiece;
        }

        setPuzzle(result);
      })
  }, [puzzleId]);

  return [...loadedCount, puzzle] as const;
}
