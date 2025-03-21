"use strict";
const canvas = document.getElementById("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");

const canvas2 = document.getElementById("canvas2");
canvas2.width = canvas2.offsetWidth;
canvas2.height = canvas2.offsetHeight;
const ctx2 = canvas2.getContext("2d");


function createArray(size, val=0){
    let array = new Array(size);
    for(let i = 0; i<size; i++){
        array[i] = new Array(size).fill(val);
    }
    return array;
}

function createMalla(size){
    let array = new Array(size);
    for(let i = 0; i<size; i++){
        array[i] = new Array(size);
        for(let j = 0; j<size;j++){
            array[i][j] = 0;
            if(Math.random() < colPercentage){
                array[i][j] = 1; // Columns
            }
            if(Math.random() < holePercentage){
                array[i][j] = 2; // Holes
            }
        }
    }
    return array;
}

function drawArray(array, malla){
    const mw = canvas.width * 0.1;
    const Mw = canvas.width * 0.9;
    const mh = canvas.height * 0.1;
    const Mh = canvas.height * 0.9;
    const tw = Mw - mw;
    const th = Mh - mh;
    let rw, rh;

    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length; j++){
            ctx.beginPath();
            rw = tw / array[i].length;
            rh = th / array[i].length;
            ctx.rect(mw + i * rw, mh + j * rh, rw, rh);
            ctx.fillStyle = calculateHexColor(drawLowLim, drawHighLim, array[i][j], malla[i][j], drawPaintLogaritmically);
            ctx.fill();

            if (stroke) {
                ctx.strokeStyle = "#fff";
                ctx.stroke();
            }

            if (drawText) {
                ctx.fillStyle = "#fff";
                ctx.font = "20px sans-serif";
                ctx.fillText(array[i][j], mw + (i + 0.1) * rw, mh + (j + 0.5) * rh);
            }

            ctx.closePath();
        }
    }
}

function drawArray2(array, malla){
    const mw = canvas2.width * 0.1;
    const Mw = canvas2.width * 0.9;
    const mh = canvas2.height * 0.1;
    const Mh = canvas2.height * 0.9;
    const tw = Mw - mw;
    const th = Mh - mh;
    let rw, rh;

    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length; j++){
            ctx2.beginPath();
            rw = tw / array[i].length;
            rh = th / array[i].length;
            ctx2.rect(mw + i * rw, mh + j * rh, rw, rh);
            ctx2.fillStyle = calculateHexColor(drawLowLim2, drawHighLim2, array[i][j], malla[i][j], drawPaintLogaritmically2);
            ctx2.fill();

            if (stroke2) {
                ctx2.strokeStyle = "#fff";
                ctx2.stroke();
            }

            if (drawText2) {
                ctx2.fillStyle = "#fff";
                ctx2.font = "12px sans-serif";
                ctx2.fillText(Math.floor(array[i][j] * 10) / 10, mw + (i + 0.1) * rw, mh + (j + 0.5) * rh);
            }

            ctx2.closePath();
        }
    }
}

function calculateHexColor(min, max, value, type, logScale) {
    if (type == 1) return "#80f";
    if (type == 2) return "#fff";
    if (value < min) return "#80f";
    if (value > max) return "#000";

    if (logScale) {
        value = Math.log(value - min + 1) / Math.log(max - min + 1);
    } else {
        value = (value - min) / (max - min);
    }

    const red = Math.round(255 * value);
    const green = Math.round(255 * (1 - value));
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`;
}
