export function generateCode(length: number = 6) {
  return new Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * (10 - 1) + 1))
    .join('');
}
