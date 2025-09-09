'use client';
import { PuzzleTable } from "@/components/PuzzleTable";
import { usePuzzle } from "@/hooks/usePuzzle";
import styles from "./home.module.css";

export default function Home() {
  const [loadedPieces, totalPieces, puzzle] = usePuzzle('mosaic2');

  const message = totalPieces === 0
    ? 'Loading...'
    : loadedPieces < totalPieces
      ? `${loadedPieces} / ${totalPieces}`
      : 'All loaded!';

  return (
    <div className={styles.page}>
      {loadedPieces === totalPieces && puzzle ? <PuzzleTable puzzle={puzzle} /> : `Heyyy! ${message}`}
    </div>
  );
}
