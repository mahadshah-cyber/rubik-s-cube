import { randomScrambleForEvent } from 'cubing/scramble';

export const generateScramble = async () => {
  const scramble = await randomScrambleForEvent("333");
  return scramble.toString();
};

export const solveCube = async (scramble: string) => {
  // Simple solver placeholder for MVP stability
  return "U R F L D B".split(" "); 
};

export const getOptimalSolve = async (scrambleStr: string) => {
    // Tooling for optimal solve path
    return "F' U L2 ...";
};
