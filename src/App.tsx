import React from "react";
import ColorPicker from "./components/ColorPicker";
import { useDrawing } from "./contexts/DrawingContext";
import Toolbar from "./components/Toolbar";
import "./App.css";

const App: React.FC = () => {
  const {
    currentText,
    setCurrentText,
    saveText,
    tool,
    canvasRef,
    handleTextPlacement,
    textPosition,
    startDrawing,
    stopDrawing,
    draw,
    drawing,
  } = useDrawing();

  return (
    <div className="app-container">
      <div className="toolbar-container ">
        <Toolbar />
        <ColorPicker />
      </div>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={(event) => drawing && draw(event, false)}
          onDoubleClick={handleTextPlacement}
          className="canvas"
          style={{
            cursor: tool === "text" ? "text" : "crosshair",
          }}
        />

        {/* Text Input Field */}
        {tool === "text" && textPosition && (
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onBlur={saveText}
            onKeyDown={(e) => e.key === "Enter" && saveText()}
            autoFocus
            className="text"
            style={{
              left: textPosition.x,
              top: textPosition.y,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
