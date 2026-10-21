import { PROBLEMS } from './dataset.js';

export { PROBLEMS };

export function getProblemByIndex(index) {
  if (index < 0 || index >= PROBLEMS.length) return null;
  return PROBLEMS[index];
}

export function getProblemById(id) {
  return PROBLEMS.find((p) => p.id === id) || null;
}

export function getTotalProblemsCount() {
  return PROBLEMS.length;
}
