import React from "react";
import { Button } from "@mui/material";

export interface IRandomPicker {
  label?: string;
  rangeMin?: number;
  rangeMax: number;
  onRandom: (index: number) => void;
}

const RandomButton = ({label = "Random", rangeMin, rangeMax, onRandom}: IRandomPicker)  => {

  const generateRandom = () => {
    const min = rangeMin ?? 0;
    const rand = Math.floor(Math.random() * (rangeMax - min) + min);
    onRandom(rand);
  }

  return (
    <Button onClick={generateRandom} variant="outlined">{label}</Button>
  );
};

export default RandomButton;