//Drawing
const drawPaintLogaritmically = false;
const drawLowLim = 1;
const drawHighLim = 20;
const drawText = true;
const stroke = false

const drawPaintLogaritmically2 = true;
const drawLowLim2 = 10;
const drawHighLim2 = 1000;
const drawText2 = true;
const stroke2 = true;
//Simulation
const colPercentage = 0.0
const holePercentage = 0.0;
const partWeight = 10;
//const maxWeight = 400;
const distanceMethod = 2;//0=rhombus, 1=square, 2= ortographic
const size = 5;



(function(){
    const startTime = performance.now()

    const malla = createMalla(size);
    const array = createArray(size,Infinity);

    malla[2][2]=1;
    //malla[15][3]=1;
    //malla[3][3]=1;
    //malla[15][15]=1;
    const stability = stability2(array, malla)
    const ponderatedArray = ponderateByDistance2ALT(array, stability, malla);
    drawArray(stability , malla);
    drawArray2(ponderatedArray, malla);
    //console.log("ponderateByDistance2")
    //console.log(ponderateByDistance2(array, malla))
    //console.log(insertionSort(ponderateByDistance2(array, malla)));
    const endTime = performance.now()
    console.log(`${endTime - startTime} millisegundos`);
})();


