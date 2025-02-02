import React from "react";
import { useDrawing } from "../contexts/DrawingContext";
import { Rectangle, Circle, Fill, Clear, Text } from "./icons";

const Toolbar: React.FC = () => {
  const { setTool, tool, isFilling, setIsFilling, clearCanvas } = useDrawing();
  const TOOLS = [
    {
      name: "Rectangle",
      icon: <Rectangle />,
      toolKey: "rectangle",
    },
    { name: "Circle", icon: <Circle />, toolKey: "circle" },
    { name: "Text", icon: <Text />, toolKey: "text" },
  ];

  return (
    <div className="toolbar">
      {TOOLS.map(({ name, icon, toolKey }) => (
        <button
          key={name}
          title={name}
          onClick={() => setTool(toolKey)}
          className={`icon ${tool === toolKey ? "icon-selected" : ""}`}
        >
          {icon}
        </button>
      ))}

      <button
        title="Fill"
        onClick={() => setIsFilling(!isFilling)}
        className={`icon ${isFilling ? "icon-selected" : ""}`}
      >
        <Fill />
      </button>

      <button title="Clear" onClick={clearCanvas} className="icon">
        <Clear />
      </button>
    </div>
  );
};

export default Toolbar;
