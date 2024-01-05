const SEED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export const keywordIdGen = (): string => {
  const DIGIT = 6;
  let id = "";
  for (let i = 0; i < DIGIT; i++) {
    id += SEED[Math.floor(Math.random() * SEED.length)];
  }
  return id;
};
