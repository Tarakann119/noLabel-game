export const drawRoundedRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number[] | number
) => {
  if (!Array.isArray(r)) {
    r = Math.min(w, h) / 2 > r ? r : Math.min(w, h) / 2;
    r = [r, r, r, r];
  } else {
    if (r.length === 1) {
      r = Math.min(w, h) / 2 > r[0] ? r[0] : Math.min(w, h) / 2;
      r = [r, r, r, r];
    } else if (r.length === 2) {
      r = [r[0], r[0], r[1], r[1]];
    }
  }

  return `M ${x + r[3]} ${y} l ${w - r[3] - r[0]} 0 q ${r[0]} 0 ${r[0]} ${r[0]}
      l 0 ${h - r[0] - r[1]} q 0 ${r[1]} ${-r[1]} ${r[1]}
      l ${-w + r[1] + r[2]} 0 q ${-r[2]} 0 ${-r[2]} ${-r[2]}
      l 0 ${-h + r[2] + r[3]} q 0 ${-r[3]} ${r[3]} ${-r[3]}`;
};
