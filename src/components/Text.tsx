import { useCallback, useState } from "react";

export default function Text({
  text = "",
  fill = "#fff",
  size = 60,
  strokeWidth = 0,
  fontWeight = 400,
  stroke = "#000",
  y = "50%",
  x = "50%",
  parentRef,
}: {
  text?: string;
  fill?: string;
  size?: number;
  strokeWidth?: number;
  fontWeight?: number;
  stroke?: string;
  y?: string;
  x?: string;
  parentRef: any;
}) {
  const [position, setPosition] = useState({ x, y });

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = useCallback(
    event => {
      // https://javascript.info/mouse-drag-and-drop
      const rect = parentRef.current.getBoundingClientRect();
      const shiftX = rect.left;
      const shiftY = rect.top;
      setPosition({
        x: event.clientX - shiftX + "px",
        y: event.clientY - shiftY + "px",
      });
    },
    [parentRef]
  );

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <text
      style={{
        fill: fill,
        fontSize: size,
        strokeWidth: strokeWidth,
        fontWeight: fontWeight,
        stroke: stroke,
        cursor: "move",
        fontFamily: "system-ui",
        textShadow: "2px 2px 6px #0000006e",
      }}
      x={position.x}
      y={position.y}
      onDrag={e => console.log(e)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {text}
    </text>
  );
}
