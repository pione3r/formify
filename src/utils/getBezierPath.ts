type Point = {
  x: number;
  y: number;
};

export const calculateDeltas = (
  startPoint: Point,
  endPoint: Point
): { dx: number; dy: number; absDx: number; absDy: number } => {
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;

  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  return { dx, dy, absDx, absDy };
};

export const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
}: {
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
} => {
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = absDx;
  let endPointY = absDy;
  if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
  if (dy < 0) [startPointY, endPointY] = [endPointY, startPointY];

  const fixedLineInflectionConstant = calculateFixedLineInflectionConstant(
    absDx,
    absDy
  );
  const lowDyYShift = calculateLowDyControlPointShift(dx, dy); // Added

  const p1 = {
    x: startPointX,
    y: startPointY,
  };
  const p2 = {
    x: startPointX + fixedLineInflectionConstant,
    y: startPointY + lowDyYShift, // Changed
  };
  const p3 = {
    x: endPointX - fixedLineInflectionConstant,
    y: endPointY - lowDyYShift, // Changed
  };
  const p4 = {
    x: endPointX,
    y: endPointY,
  };

  return { p1, p2, p3, p4 };
};

export const calculateControlPointsWithBuffer = ({
  boundingBoxElementsBuffer,
  absDx,
  absDy,
  dx,
  dy,
}: {
  boundingBoxElementsBuffer: number;
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
}): {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
  boundingBoxBuffer: {
    vertical: number;
    horizontal: number;
  };
} => {
  const { p1, p2, p3, p4 } = calculateControlPoints({
    absDx,
    absDy,
    dx,
    dy,
  });

  const topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
  const bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
  const leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
  const rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);

  const verticalBuffer =
    (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
  const horizontalBuffer =
    (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;

  const boundingBoxBuffer = {
    vertical: verticalBuffer,
    horizontal: horizontalBuffer,
  };

  return {
    p1: {
      x: p1.x + horizontalBuffer,
      y: p1.y + verticalBuffer,
    },
    p2: {
      x: p2.x + horizontalBuffer,
      y: p2.y + verticalBuffer,
    },
    p3: {
      x: p3.x + horizontalBuffer,
      y: p3.y + verticalBuffer,
    },
    p4: {
      x: p4.x + horizontalBuffer,
      y: p4.y + verticalBuffer,
    },
    boundingBoxBuffer,
  };
};

export const calculateCanvasDimensions = ({
  absDx,
  absDy,
  boundingBoxBuffer,
}: {
  absDx: number;
  absDy: number;
  boundingBoxBuffer: { vertical: number; horizontal: number };
}): {
  canvasWidth: number;
  canvasHeight: number;
} => {
  const canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
  const canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;

  return { canvasWidth, canvasHeight };
};

const MAX_Y_CONTROL_POINT_SHIFT = 50;

export const calculateLowDyControlPointShift = (
  dx: number,
  dy: number,
  maxShift = MAX_Y_CONTROL_POINT_SHIFT
) => {
  if (dx > 0) return 0;
  const sign = dy < 0 ? -1 : 1;
  const value = Math.round(
    maxShift * Math.pow(0.9, Math.pow(1.2, Math.abs(dy) / 10))
  );

  // prevent negative zero
  if (value === 0) return 0;

  return sign * value;
};

// Curve flexure should remain on the same area no matter of absolute deltas, so we have to slightly shift X coordinates of our control points. It was created empirically, it's not based on a clear formula.
export const calculateFixedLineInflectionConstant = (
  absDx: number,
  absDy: number
) => {
  const WEIGHT_X = 4;
  const WEIGHT_Y = 0.8;

  return Math.round(Math.sqrt(absDx) * WEIGHT_X + Math.sqrt(absDy) * WEIGHT_Y);
};
