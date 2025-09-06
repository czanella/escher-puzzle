'use client';
import { usePuzzle } from "@/hooks/usePuzzle";
import styles from "./home.module.css";

export default function Home() {
  const [loadedPieces, totalPieces] = usePuzzle('mosaic2');

  const message = totalPieces === 0
    ? 'Loading...'
    : loadedPieces < totalPieces
      ? `${loadedPieces} / ${totalPieces}`
      : 'All loaded!';

  return (
    <div className={styles.page}>
      Heyyyy! {message}
    </div>
  );
}
