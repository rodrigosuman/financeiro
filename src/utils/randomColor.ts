
const randomColor = function () {
  const randomIndex = Math.floor(Math.random() * 100);

  return `#ffffff${randomIndex < 10 ? `0${randomIndex}` : randomIndex}`;
};

export default randomColor;
