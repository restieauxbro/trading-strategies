describe_indicator("B-Xtrender Monthly On Daily", "lower", {
  shortName: "Monthly BX",
});

// ===========================
// Inputs
// ===========================
const short_l1 = input.number("Short - L1", 5);
const short_l2 = input.number("Short - L2", 20);
const short_l3 = input.number("Short - L3 (RSI)", 5);

const long_l1 = input.number("Long - L1", 20);
const long_l2 = input.number("Long - L2 (RSI)", 5);

// ===========================
// Pull monthly data
// ===========================
const monthly = await request.history(constants.ticker, "M");

// ===========================
// 1. Monthly calculations
// ===========================
// Background long-term trend
const myEmaLongM = ema(monthly.close, long_l1);
const longTermXtrenderM = sub(rsi(myEmaLongM, long_l2), 50);

// Foreground short-term oscillator
const myEmaShort1M = ema(monthly.close, short_l1);
const myEmaShort2M = ema(monthly.close, short_l2);
const myEmaDiffM = sub(myEmaShort1M, myEmaShort2M);
const shortTermXtrenderM = sub(rsi(myEmaDiffM, short_l3), 50);

// ===========================
// 2. T3 smoothing
// ===========================
function t3(src, len) {
  const b = 0.7;
  const c1 = -b * b * b;
  const c2 = 3 * b * b + 3 * b * b * b;
  const c3 = -6 * b * b - 3 * b - 3 * b * b * b;
  const c4 = 1 + 3 * b + b * b * b + 3 * b * b;

  const e1 = ema(src, len);
  const e2 = ema(e1, len);
  const e3 = ema(e2, len);
  const e4 = ema(e3, len);
  const e5 = ema(e4, len);
  const e6 = ema(e5, len);

  return add(mult(e6, c1), mult(e5, c2), mult(e4, c3), mult(e3, c4));
}

const maLineM = t3(shortTermXtrenderM, 5);

// ===========================
// 3. Encode monthly color states
// ===========================
// 1 = positive and rising
// 2 = positive and falling
// 3 = negative and rising
// 4 = negative and falling
const shortColorCodeM = for_every(shortTermXtrenderM, (_val, _prevVal) => {
  if (_val > 0) return _val > _prevVal ? 1 : 2;
  return _val > _prevVal ? 3 : 4;
});

const longColorCodeM = for_every(longTermXtrenderM, (_val, _prevVal) => {
  if (_val > 0) return _val > _prevVal ? 1 : 2;
  return _val > _prevVal ? 3 : 4;
});

const maColorCodeM = for_every(maLineM, (v, p) => (v > p ? 1 : 0));

// ===========================
// 4. Monthly turning points
// ===========================
const upDotsM = for_every(maLineM, (v, p, i) =>
  i > 2 && v > maLineM[i - 1] && maLineM[i - 1] < maLineM[i - 2] ? v : null,
);

const dnDotsM = for_every(maLineM, (v, p, i) =>
  i > 2 && v < maLineM[i - 1] && maLineM[i - 1] > maLineM[i - 2] ? v : null,
);

const buyTriggerM = for_every(maLineM, (v, p, i) =>
  i > 2 && v > maLineM[i - 1] && maLineM[i - 1] < maLineM[i - 2] ? 1 : 0,
);

// ===========================
// 5. Land monthly values onto the chart
// ===========================
const longTermXtrender = interpolate_sparse_series(
  land_points_onto_series(monthly.time, longTermXtrenderM, time),
  "constant",
);

const shortTermXtrender = interpolate_sparse_series(
  land_points_onto_series(monthly.time, shortTermXtrenderM, time),
  "constant",
);

const maLine = interpolate_sparse_series(
  land_points_onto_series(monthly.time, maLineM, time),
  "constant",
);

const shortColorCode = interpolate_sparse_series(
  land_points_onto_series(monthly.time, shortColorCodeM, time),
  "constant",
);

const longColorCode = interpolate_sparse_series(
  land_points_onto_series(monthly.time, longColorCodeM, time),
  "constant",
);

const maColorCode = interpolate_sparse_series(
  land_points_onto_series(monthly.time, maColorCodeM, time),
  "constant",
);

// Do not interpolate the dots or they will stretch across the whole month.
const upDots = land_points_onto_series(monthly.time, upDotsM, time);
const dnDots = land_points_onto_series(monthly.time, dnDotsM, time);

const buyTrigger = interpolate_sparse_series(
  land_points_onto_series(monthly.time, buyTriggerM, time),
  "constant",
);

// ===========================
// 6. Convert codes to softer colors
// ===========================
const shortXColor = for_every(shortColorCode, (code) => {
  if (code === 1) return "#79d279";
  if (code === 2) return "#5fbf5f";
  if (code === 3) return "#ff6b6b";
  return "#d94c4c";
});

const longXColor = for_every(longColorCode, (code) => {
  if (code === 1) return "#79d279";
  if (code === 2) return "#5fbf5f";
  if (code === 3) return "#ff6b6b";
  return "#d94c4c";
});

const maColor = for_every(maColorCode, (code) =>
  code === 1 ? "#6fdc6f" : "#ff5c5c",
);

// ===========================
// 7. Paint
// ===========================
// paint(longTermXtrender, {
//     name: 'B-Xtrender Trend - Monthly Background',
//     style: 'histogram',
//     color: longXColor,
//     thickness: 1,
//     opacity: 0.9
// });

paint(shortTermXtrender, {
  name: "B-Xtrender Osc. - Monthly Histogram",
  style: "column",
  color: shortXColor,
  thickness: 2,
  opacity: 0.9,
});

// paint(maLine, {
//     name: 'Shadow',
//     style: 'line',
//     color: '#000000',
//     thickness: 4
// });

// paint(maLine, {
//     name: 'Signal',
//     style: 'line',
//     color: maColor,
//     thickness: 2
// });

// paint(upDots, {
//     name: 'Turn Up',
//     style: 'dotted',
//     color: '#79d279',
//     thickness: 5
// });

// paint(dnDots, {
//     name: 'Turn Down',
//     style: 'dotted',
//     color: '#ff6b6b',
//     thickness: 5
// });

// Hidden output for scanners.
paint(buyTrigger, {
  name: "Buy Signal Trigger",
  style: "line",
  color: "transparent",
  thickness: 5,
});
