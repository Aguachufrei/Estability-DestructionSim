"use strict";
const canvas = document.getElementById("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");
const partWeight = 10;
const maxWeight = 400;
const canvas2 = document.getElementById("canvas2");
canvas2.width = canvas2.offsetWidth;
canvas2.height = canvas2.offsetHeight;
const ctx2 = canvas2.getContext("2d");


function createArray(size){
    let array = new Array(size);
    for(let i = 0; i<size; i++){
        array[i] = new Array(size);
        for(let j = 0; j<size;j++){
            array[i][j]=0;
        }
    }
    return array;
}
function createMalla(size){
    let array = new Array(size);
    for(let i = 0; i<size; i++){
        array[i] = new Array(size);
        for(let j = 0; j<size;j++){
            array[i][j]=0;
            if(Math.random()>0.99){
                array[i][j]=1;
            }
            if(Math.random()>1){
                array[i][j]=2;
            }
        }
    }
    return array;
}

function drawArray(array, malla){
    const mw = canvas.width*0.1;
    const Mw = canvas.width*0.9;
    const mh = canvas.height*0.1;
    const Mh = canvas.height*0.9;
    const tw = Mw-mw;
    const th = Mh-mh;
    let rw;
    let rh;
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length; j++){
            ctx.beginPath();
            rw = tw/array[i].length;
            rh = th/array[i].length;
            ctx.rect(mw+i*rw, mh+j*rh, rw, rh);
            ctx.fillStyle = calculateHexColor(1, 10    , array[i][j], malla[i][j]);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            //ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.font = "20px sans serif";
            //ctx.fillText(array[i][j],mw+(i+0.1)*rw,mh+(j+0.5)*rh);
            ctx.closePath();

        }
    }
}


function drawArray2(array, malla){
    const mw = canvas2.width*0.1;
    const Mw = canvas2.width*0.9;
    const mh = canvas2.height*0.1;
    const Mh = canvas2.height*0.9;
    const tw = Mw-mw;
    const th = Mh-mh;
    let rw;
    let rh;
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length; j++){
            ctx2.beginPath();
            rw = tw/array[i].length;
            rh = th/array[i].length;
            ctx2.rect(mw+i*rw, mh+j*rh, rw, rh);
            ctx2.fillStyle = calculateHexColor(10, 400    , array[i][j], malla[i][j]);
            ctx2.fill();
            ctx2.strokeStyle = "#fff";
            //ctx2.stroke();
            ctx2.fillStyle = "#fff";
            ctx2.font = "12px sans serif";
            //ctx2.fillText(Math.floor(array[i][j]*10)/10,mw+(i+0.1)*rw,mh+(j+0.5)*rh);
            ctx2.closePath();

        }
    }
}



function calculateHexColor(min, max, value, type) {
    // Ensure value is between min and max

    if (type == 1) return "#80f";
    if (type == 2) return "#000";
    if (value < min) return "#80f";
    if (value > max) return "#000";

    // Calculate percentage (0 to 1 range)
    const percentage = (value - min) / (max - min);

    // Interpolate red and green components
    const red = Math.round(255 * percentage);   // From 0 (green) to 255 (red)
    const green = Math.round(255 * (1 - percentage));  // From 255 (green) to 0 (red)

    // Return the hex color string
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}00`;
    return hexColor;
}

(function(){
    const startTime = performance.now()
    const size = 150;
    const malla = createMalla(size);
    const array = createArray(size);
    //malla[3][15]=1;
    //malla[15][3]=1;
    //malla[3][3]=1;
    //malla[15][15]=1;
    const ponderatedArray = ponderateByDistance2(array, malla);
    drawArray(ponderateByDistance(array, malla), malla);
    drawArray2(ponderatedArray, malla);
    //console.log("ponderateByDistance2")
    //console.log(ponderateByDistance2(array, malla))
    //console.log(insertionSort(ponderateByDistance2(array, malla)));
    const endTime = performance.now()
    console.log(`${endTime - startTime} millisegundos`);
})();


