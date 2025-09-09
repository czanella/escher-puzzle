import { useEffect, useState } from "react";

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


export function usePuzzle(puzzleId: string) {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/puzzles/${puzzleId}/pieces.json`)
      .then(r => r.json())
      .then((pieces: PuzzleJson) => {
        const result: Puzzle = {};
        setLoaded(0);
        setTotal(Object.keys(pieces).length);
        for (const [key, pieceData] of Object.entries(pieces)) {
          const pieceKey = parseInt(key);
          const newPiece: PuzzlePiece = {
            image: new Image(),
            position: pieceData.position,
            neighbors: [],
          };
          newPiece.image.src = `/puzzles/${puzzleId}/${pieceData.image}`;
          newPiece.image.decode().then(() => {
            setLoaded(loaded => loaded + 1);
          });
          result[pieceKey] = newPiece;
        }

        setPuzzle(result);
      })
  }, [puzzleId]);

  return [loaded, total, puzzle] as const;
}
