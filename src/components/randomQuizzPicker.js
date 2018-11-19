export default (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const selection = array.slice(randomIndex, randomIndex + 1).shift();
  const filterd = array.filter(item => item !== selection);
  this.setState(() => ({array: filterd}));
  console.log(selection, filterd)
};