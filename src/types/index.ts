export type Drawing = {
  x: number;
  y: number;
  color: string;
  tool: string;
  isStart: boolean;
  fillColor?: string;
  shapeProps?: { width?: number; height?: number; radius?: number };
  text?: string;
};

export type DrawingContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  tool: string;
  setTool: (tool: string) => void;
  setColor: (color: string) => void;
  isFilling: boolean;
  setIsFilling: (isFilling: boolean) => void;
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  stopDrawing: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement>, isStart?: boolean) => void;
  clearCanvas: () => void;
  handleTextPlacement: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  textPosition: { x: number; y: number } | null;
  saveText: () => void;
  currentText: string;
  setCurrentText: (currentText: string) => void;
  drawing: boolean;
  color: string
};
