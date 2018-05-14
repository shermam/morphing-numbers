import { drawTextFactory } from "./drawText.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = canvas.height = 30;
const drawText = drawTextFactory(canvas.width, canvas.height);

const btnDraw = document.querySelector('#draw');
let num = 0;


btnDraw.addEventListener('click', e => {
    drawID(drawText(num++));
});

function drawID(imagData) {
    context.putImageData(imagData, 0, 0);
}