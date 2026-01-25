import React from 'react';

const opacityByCell: Record<number, number> = {
  1: 1,
  2: 0.85,
  3: 0.7,
  4: 0.05,
  6: 0.55,
  7: 0.1,
  8: 0.25,
  9: 0.4,
};

const cellPositions = [
  { x: 1, y: 1, index: 1 },
  { x: 9, y: 1, index: 2 },
  { x: 17, y: 1, index: 3 },
  { x: 1, y: 9, index: 4 },
  // center is intentionally empty (index 5)
  { x: 17, y: 9, index: 6 },
  { x: 1, y: 17, index: 7 },
  { x: 9, y: 17, index: 8 },
  { x: 17, y: 17, index: 9 },
];

export function LogoMark(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={20}
      height={20}
      {...props}
    >
      {cellPositions.map(({ x, y, index }) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={6}
          height={6}
          fill="currentColor"
          opacity={opacityByCell[index]}
        />
      ))}
    </svg>
  );
}

export default LogoMark;
