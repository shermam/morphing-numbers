//@ts-check
import { drawTextFactory } from "./drawText.js";
import { diffID, sameID, getPixels, mapPixels, getIDFromMap } from "./utils.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = canvas.height = 1000;
const drawText = drawTextFactory(canvas.width, canvas.height);
const animFrames = 30;


const btnDraw = document.querySelector('#draw');
let num = 0;


btnDraw.addEventListener('click', e => {
    const firstID = drawText(num);
    const secondID = drawText(++num);
    //const diff = diffID(firstID, secondID);
    //const same = sameID(firstID, secondID);

    const firstPixels = getPixels(firstID);
    const secondPixels = getPixels(secondID);
    const mappedPixels = [].concat(
        mapPixels(firstPixels, secondPixels, false),
        mapPixels(secondPixels, firstPixels, true)
    );

    clearCanvas();
    animate(mappedPixels, animFrames);
    //drawID(getIDFromMap(mappedPixes, canvas.width, canvas.height));
    //drawMap(mappedPixes);
    //drawID(firstID);
});

function animate(mappedPixels, animFrames) {
    let count = 0;

    (function loop() {
        const interpolatedMap = getInterpolatedMap(mappedPixels, count, animFrames);

        drawID(getIDFromMap(interpolatedMap, canvas.width, canvas.height));
        count++;
        if (count <= animFrames) {
            requestAnimationFrame(loop);
        }
    })()
}

function getInterpolatedMap(mappedPixels, count, animFrames) {
    if (count === 0) return mappedPixels;

    if (count === animFrames) {
        return mappedPixels.map(p => ({ x: p.toX, y: p.toY }));
    }

    return mappedPixels.map(p => {

        if (p.x === p.toX && p.y === p.toY) {
            return { x: p.x, y: p.y };
        }

        if (p.x === p.toX) {
            return { x: p.x, y: p.y + ((p.toY - p.y) * (count / animFrames)) };
        }

        if (p.y === p.toY) {
            return { x: p.x + ((p.toX - p.x) * (count / animFrames)), y: p.y };
        }


        const distance = (count / animFrames) * p.distance;
        const dx = Math.sqrt((distance ** 2) / (1 + (p.r ** 2)));
        const dy = dx * p.r;
        const ret = { x: Math.round(p.x + dx), y: Math.round(p.y + dy) };

        return ret;
    });
}

// a**2 + b**2 = c**2
// ((x2 - x1) ** 2) + ((y2 - y1) ** 2) = d ** 2
//Let the ratio be 1:r and the hypotenuse be h. 
//Then the sides are then x and rx for some x. 
//By the Pythagorean Theorem we get x2+r2∗x2=h2. 
//So x= sqrt(h2/(1+r2)). We can then calculate rx, the other side.

function drawID(imagData) {
    context.putImageData(imagData, 0, 0);
}

function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.closePath();
}

function drawMap(mappedPixes) {
    mappedPixes.forEach(m => {
        context.beginPath();
        context.moveTo(m.x, m.y);
        context.lineTo(m.toX, m.toY);
        context.stroke();
        context.closePath();
    });
}