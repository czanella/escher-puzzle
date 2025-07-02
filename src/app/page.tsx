'use client';
import { Puzzle } from "@/puzzle";
import { useEffect } from "react";
import styles from "./home.module.css";

export default function Home() {
  useEffect(() => {
    const puzzleImage = new Image();
    puzzleImage.src = '/puzzles/mosaic_2.jpg';

    const maskImage = new Image();
    maskImage.src = '/puzzles/mosaic_mask_2.gif';

    Promise.all([puzzleImage.decode(), maskImage.decode()]).then(() => {
      const puzzle = new Puzzle(puzzleImage, maskImage);

      console.log('LOADED!');
      console.log(puzzle.maskPixels);
    });
  }, []);

  return (
    <div className={styles.page}>
      Heyyyy!
    </div>
  );
}
