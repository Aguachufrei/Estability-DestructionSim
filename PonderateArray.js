function ponderateArray(array, malla) {
    const newArray = cloneArray(array); // Asegúrate de tener una función para clonar el array

    // Iteramos sobre cada elemento de la malla
    for (let i = 0; i < malla.length; i++) {
        for (let j = 0; j < malla[i].length; j++) {
            // Solo trabajamos con los cuadrados (malla[i][j] === 0) que no son columnas (1) ni agujeros (2)
            if (malla[i][j] === 0) {
                let weight = 0;

                // Revisamos los adyacentes (arriba, abajo, izquierda, derecha)
                // Para cada dirección, nos aseguramos de que no haya una columna ni un agujero
                if (i > 0 && malla[i-1][j] !== 1 && malla[i-1][j] !== 2) weight += partWeight / 4; // Arriba
                if (i < malla.length - 1 && malla[i+1][j] !== 1 && malla[i+1][j] !== 2) weight += partWeight / 4; // Abajo
                if (j > 0 && malla[i][j-1] !== 1 && malla[i][j-1] !== 2) weight += partWeight / 4; // Izquierda
                if (j < malla[i].length - 1 && malla[i][j+1] !== 1 && malla[i][j+1] !== 2) weight += partWeight / 4; // Derecha

                // Asignamos la carga calculada al cuadrado en la matriz de cargas
                newArray[i][j] = weight;
            }
        }
    }

    return newArray;
}

function ponderateByDistance(array, malla) {
    let newArray = cloneArray(array);
    // Iteramos sobre cada elemento de la malla
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            // Solo trabajamos con los cuadrados (malla[i][j] === 0)
            if(malla[i][j]!==0)continue;
            newArray[i][j] = minDistanceToClosestColumn(array, malla, i, j)[2];
        }
    }
    return newArray;
}
function ponderateByDistance2(array, malla) {
    let newArray = Array.from({ length: array.length }, () => Array(array[0].length).fill(partWeight));
    plainArray = [];
    // Iteramos sobre cada elemento de la malla
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            // Solo trabajamos con los cuadrados (malla[i][j] === 0)
            if(malla[i][j]!==0)continue;
            plainArray.push([i, j, minDistanceToClosestColumn(array, malla, i, j)[2]]);
        }
    }
    let x; let y;
    console.log(plainArray)
    orderedArr = insertionSort(plainArray);
    console.log(orderedArr);
    for(let i = orderedArr.length-1; i>0; i--){
        x = orderedArr[i][0];
        y = orderedArr[i][1];
        let amount = [];
        if(x+1<array.length&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x+1, y)[2]){
            amount.push([x+1, y]);
        }
        if(y+1<array.length&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x, y+1)[2]){
            amount.push([x, y+1]);
        }
        if(x>0&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x-1, y)[2]){
            amount.push([x-1, y]);
        }
        if(x>0&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x, y-1)[2]){
            amount.push([x, y-1]);
        }
        if(x+1<array.length&&y+1<array.length&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x+1, y+1)[2]){
            amount.push([x+1, y+1]);
        }
        if(x+1<array.length&&y>0&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x+1, y-1)[2]){
            amount.push([x+1, y-1]);
        }
        if(x>0&&y+1<array.length&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x-1, y+1)[2]){
            amount.push([x-1, y+1]);
        }
        if(x>0&&y>0&&orderedArr[i][2]>minDistanceToClosestColumn(array, malla, x-1, y-1)[2]){
            amount.push([x-1, y-1]);
        }

        for(let j = 0; j<amount.length; j++){
            newArray[amount[j][0]][amount[j][1]]+=(newArray[x][y]/amount.length);
        }
    }
    return newArray;

}
function ponderateByDistance3(array, malla) {
    let newArray = cloneArray(array);
    // Iteramos sobre cada elemento de la malla
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            // Solo trabajamos con los cuadrados (malla[i][j] === 0)
            if(malla[i][j]!==0)continue;
            newArray[i][j] = avgDistanceToAllColumns(array, malla, i, j);
        }
    }
    return newArray;
}

function SortByClosestArray(array, malla) {
    //Array que contendra ordenadamente todos los elementos de array, en concreto, sus cordenadas y la distancia a la columna mas proxima
    let newArray = [];
    for(let i = 0; i<array.length; i++){
        for(let j = 0; j<array[0].length; j++){
        //si es una columna u otra cosa no operamos sobre ello.
            if(malla[i][j]!==0)continue;
            newArray.push([i, j, minDistanceToClosestColumn(array, malla, i, j)])
        }
    }
    return mergeSortByDistance(newArray);
}


function minDistanceToClosestColumn(array, malla, x, y){
    let minValue = [-1, -1, Infinity];
    let min = Infinity;
    let value = Infinity;
    //Obtenemos la distancia a la columna mas cercana con un 1 en la malla.
    for(let i = 0; i<array.length; i++){
        for(let j = 0; j<array[0].length; j++){
            if(malla[i][j] !== 1) continue;
                value = ([i, j, distance(x, y, i, j)]);
                if(value[2]<min){
                    min = value[2];
                    minValue = value;
                }
        }
    }
    return minValue;
}
function avgDistanceToAllColumns(array, malla, x, y){
    let n = 0;
    let value = 0;
    //Obtenemos la distancia a la columna mas cercana con un 1 en la malla.
    for(let i = 0; i<array.length; i++){
        for(let j = 0; j<array[0].length; j++){
            if(malla[i][j] !== 1) continue;
            value += distance(x, y, i, j);
            n++;
        }
    }
    return value/n;
}
function distance(x1, y1, x2, y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
    //return Math.abs(x1-x2)+Math.abs(y1-y2)
    //return Math.max(Math.abs(x1-x2),Math.abs( y1-y2));
}

