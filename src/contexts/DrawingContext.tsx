import React, { createContext, useContext, useState, useEffect } from "react";
import { Drawing, DrawingContextType } from "../types";
import { useSocket } from "../hooks/useSocket";
import { useCanvas } from "../hooks/useCanvas";

const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawing, setDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("black");
  const [tool, setTool] = useState<string>("rectangle");
  const [startCoords, setStartCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [textPosition, setTextPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isFilling, setIsFilling] = useState(false);

  const { canvasRef, ctxRef, clearCanvas: clearBoard } = useCanvas();
  const socket = useSocket(setDrawings, redrawCanvas, clearCanvas);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctxRef.current = ctx;
      }
    }
    // eslint-disable-next-line
  }, []);

  function redrawCanvas(drawings: Drawing[]) {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas only when necessary
      drawings.forEach(
        ({ x, y, color, fillColor, isStart, tool, shapeProps, text }) => {
          ctx.strokeStyle = color;
          ctx.fillStyle = color;

          if (
            tool === "rectangle" &&
            shapeProps?.width &&
            shapeProps?.height
          ) {
            ctx.beginPath();
            ctx.rect(x, y, shapeProps.width, shapeProps.height);
            if (fillColor) ctx.fill();

            ctx.stroke();
          } else if (tool === "circle" && shapeProps?.radius) {
            ctx.beginPath();
            ctx.arc(x, y, shapeProps.radius, 0, Math.PI * 2);
            if (fillColor) ctx.fill();

            ctx.stroke();
          } else if (tool === "text" && text) {
            ctx.font = "20px Arial";
            ctx.fillText(text, x, y);
          }
        }
      );
    }
  }

  function startDrawing(event: React.MouseEvent<HTMLCanvasElement>) {
    setDrawing(true);
    const { clientX: x, clientY: y } = event;
    setStartCoords({ x, y });
   
  }

  function stopDrawing(event: React.MouseEvent<HTMLCanvasElement>) {
    setDrawing(false);
    ctxRef.current?.beginPath();

    if (startCoords) {
      const { x: startX, y: startY } = startCoords;
      const { clientX: endX, clientY: endY } = event;

      if (tool === "rectangle") {
        const width = endX - startX;
        const height = endY - startY;
        const newDrawing: Drawing = {
          x: startX,
          y: startY,
          color,
          tool,
          isStart: false,
          shapeProps: { width, height },
          fillColor: isFilling ? color : "",
        };

        setDrawings((prevDrawings) => [...prevDrawings, newDrawing]);
        socket.emit("draw", newDrawing);
      } else if (tool === "circle") {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const newDrawing: Drawing = {
          x: startX,
          y: startY,
          color,
          tool,
          isStart: false,
          shapeProps: { radius },
          fillColor: isFilling ? color : "",
        };

        setDrawings((prevDrawings) => [...prevDrawings, newDrawing]);
        socket.emit("draw", newDrawing);
      }
    }
  }

  function draw(event: React.MouseEvent<HTMLCanvasElement>, isStart = false) {
    if (!drawing || !ctxRef.current) return;
    const currentColor = color;
    const { clientX: x, clientY: y } = event;
    ctxRef.current.strokeStyle = currentColor;

   if (tool === "rectangle" && startCoords) {
      const { x: startX, y: startY } = startCoords;
      const width = x - startX;
      const height = y - startY;

      // restore the previous state before drawing the updated rectangle
      redrawCanvas(drawings);
      ctxRef.current.strokeRect(startX, startY, width, height);

    } else if (tool === "circle" && startCoords) {
      const { x: startX, y: startY } = startCoords;
      const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);

      redrawCanvas(drawings);

      ctxRef.current.beginPath();
      ctxRef.current.arc(startX, startY, radius, 0, Math.PI * 2);
      ctxRef.current.stroke();
    }
  }

  
  function clearCanvas() {
    socket.emit("clear");
    clearBoard();
  }

  function handleTextPlacement(event: React.MouseEvent<HTMLCanvasElement>) {
    if (tool !== "text") return;

    const { clientX: x, clientY: y } = event;
    setTextPosition({ x, y: y });
    setCurrentText("");
  }

  function saveText() {
    if (!textPosition || currentText.trim() === "") {
      setTextPosition(null);
      return;
    }

    const { x, y } = textPosition;
    const newTextDrawing: Drawing = {
      x,
      y,
      color,
      tool: "text",
      isStart: false,
      text: currentText,
    };

    setDrawings((prevDrawings) => [...prevDrawings, newTextDrawing]);
    socket.emit("draw", newTextDrawing);
    setTextPosition(null);
    setCurrentText("");
  }

  return (
    <DrawingContext.Provider
      value={{
        canvasRef,
        tool,
        setTool,
        setColor,
        isFilling,
        setIsFilling,
        startDrawing,
        stopDrawing,
        draw,
        clearCanvas,
        handleTextPlacement,
        textPosition,
        currentText,
        saveText,
        drawing,
        setCurrentText,
        color,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () =>
  useContext(DrawingContext) as DrawingContextType;
