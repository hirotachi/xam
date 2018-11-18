let tests = [1,2,3,4,5,6,7,8,9];

const popRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const selection = array.slice(randomIndex, randomIndex + 1).shift();
  tests = array.filter(item => item !== selection);
  console.log(selection, tests)
};