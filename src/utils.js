export const REQUEST_STATUS = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

export function decimalToPercentString(x, decimal = 2) {
  return `${Number(x * 100).toFixed(decimal)}%`;
}
