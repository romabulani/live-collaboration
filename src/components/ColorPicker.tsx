import React from "react";
import { useDrawing } from "../contexts/DrawingContext";

const COLORS = ["black", "red", "blue"];

const ColorPicker: React.FC = () => {
  const { setColor, color: selectedColor } = useDrawing();

  return (
    <div className="color-container">
      {COLORS.map((color) => (
        <button
          key={color}
          title={color}
          onClick={() => setColor(color)}
          className="color"
          style={{
            background: color,
            border: `2px solid ${
              selectedColor === color ? "gray" : "lightgray"
            }`,
          }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
