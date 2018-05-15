//@ts-check
import { drawTextFactory } from "./drawText.js";
import { diffID, sameID } from "./utils.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = canvas.height = 30;
const drawText = drawTextFactory(canvas.width, canvas.height);


const btnDraw = document.querySelector('#draw');
let num = 0;


btnDraw.addEventListener('click', e => {
    const firstID = drawText(num);
    const secondID = drawText(++num);
    const diff = diffID(firstID, secondID);
    const same = sameID(firstID, secondID);

    drawID(same);
});

function drawID(imagData) {
    context.putImageData(imagData, 0, 0);
}