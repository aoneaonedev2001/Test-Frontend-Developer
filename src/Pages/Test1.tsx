import React, { useState } from "react";
import ShapeButtons from "../Components/ShapeButtons";
import ShapeContent from "../Components/ShapeContent";
import { useTranslation } from "react-i18next";

const Test1 = () => {
  const { t } = useTranslation();
  const [Position, setPosition] = useState<boolean>(true);
  const [shapePositions, setShapePositions] = useState<string[]>([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const moveLeft = () => {
    const newPositions = [...shapePositions];
    const first = newPositions.shift();
    if (first) {
      newPositions.push(first);
    }
    setShapePositions(newPositions);
  };

  const moveRight = () => {
    const newPositions = [...shapePositions];
    const last = newPositions.pop();
    if (last) {
      newPositions.unshift(last);
    }
    setShapePositions(newPositions);
  };

  const Random = () => {
    const shuffled = [...shapePositions].sort(() => Math.random() - 0.5);
    setShapePositions(shuffled);
  };

  const MovePosition = () => {
    setPosition(!Position);
  };

  return (
    <>
      <h1>{t("test1.content1")}</h1>
      <div className="containerTest1Content">
        <ShapeButtons
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
          onMovePosition={MovePosition}
        />
        <ShapeContent
          shapes={shapePositions}
          onRandom={Random}
          Position={Position}
        />
      </div>
    </>
  );
};

export default Test1;
