import '@testing-library/jest-dom';
import { createCanvas } from 'canvas';

window.HTMLCanvasElement.prototype.getContext = () => {
  return createCanvas().getContext('2d');
};
