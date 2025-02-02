import { useEffect } from "react";
import io from "socket.io-client";
import { Drawing } from "../types";

const socket = io("https://live-collaboration-whiteboard-nllh.onrender.com");

export const useSocket = (setDrawings: React.Dispatch<React.SetStateAction<Drawing[]>>, redrawCanvas: (drawings: Drawing[]) => void, clearCanvasRef: () => void) => {
  useEffect(() => {
    socket.on("load-drawings", (savedDrawings: Drawing[]) => {
      setDrawings(() => savedDrawings);
      redrawCanvas(savedDrawings);
    });

    socket.on("draw", (data: Drawing) => {
      setDrawings((prevDrawings) => {
        const updatedDrawings = [...prevDrawings, data];
        redrawCanvas(updatedDrawings);
        return updatedDrawings;
      });
    });

    socket.on("clear", () => {
      setDrawings([]);
      clearCanvasRef();
    });

    return () => {
      socket.off("load-drawings");
      socket.off("draw");
      socket.off("clear");
    };
  }, [setDrawings, redrawCanvas, clearCanvasRef]);

  return socket;
};
