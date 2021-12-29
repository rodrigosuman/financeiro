import { theme } from '../providers/ThemeProvider/ThemeProvider';

const randomColor = function () {
  const colorsKeys = Object.keys(theme.colors);
  const randomIndex = Math.floor(Math.random() * 100);
  const randomColorIndex = Math.floor(Math.random() * colorsKeys.length);
  let colorKey = colorsKeys[randomColorIndex];

  colorKey = colorKey === 'bgLight' ? 'success' : colorKey;

  return `${theme.colors[`${colorKey}`]}90`;
};

export default randomColor;
