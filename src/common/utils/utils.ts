const getRandomNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomPrice = (category: string) => {
  switch (category) {
    case 'lamb':
      return getRandomNumberInRange(100, 81);
    case 'beef':
      return getRandomNumberInRange(80, 61);
    case 'pork':
      return getRandomNumberInRange(60, 41);
    default:
      return getRandomNumberInRange(40, 5);
  }
};
