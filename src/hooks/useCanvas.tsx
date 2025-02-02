import { useRef, useEffect } from "react";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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
  }, []);

  function clearCanvas() {
    const ctx = ctxRef.current;
    if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  return { canvasRef, ctxRef, clearCanvas };
};
