function stability(array, malla) {
    const newArray = cloneArray(array);

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
function stability2(array, malla){
    for (let i= 0; i<malla.length;i++){
        for (let j = 0; j < malla[i].length; j++) {
            if (malla[i][j] === 1){//Para cada columna
                array[i][j]=0;
                expandSquareRec(i, j, array, malla);
            }
        }
    }
    return array;
}
function expandSquareRec(x, y, array, malla) {
    let value = array[x][y];
    let l = array.length;

    // ↑
    if (y > 0 && array[x][y - 1] > value + 1 && malla[x][y - 1] == 0) {
        array[x][y - 1] = value + 1;
        expandSquareRec(x, y - 1, array, malla);
    }
    // ←
    if (x > 0 && array[x - 1][y] > value + 1 && malla[x - 1][y] == 0) {
        array[x - 1][y] = value + 1;
        expandSquareRec(x - 1, y, array, malla);
    }
    // ↓
    if (y < l - 1 && array[x][y + 1] > value + 1 && malla[x][y + 1] == 0) {
        array[x][y + 1] = value + 1;
        expandSquareRec(x, y + 1, array, malla);
    }
    // →
    if (x < l - 1 && array[x + 1][y] > value + 1 && malla[x + 1][y] == 0) {
        array[x + 1][y] = value + 1;
        expandSquareRec(x + 1, y, array, malla);
    }

    // Diagonal movement based on distanceMethod
    if (distanceMethod == 0) return array; // Square and Euclidean allow diagonals
        let diagCost = distanceMethod === 2 ? 1.4 : 1; // 1.4 for Euclidean (approx sqrt(2)), 1 for Square

    // ↖
    if (x > 0 && y > 0 && array[x - 1][y - 1] > value + diagCost && malla[x - 1][y - 1] == 0) {
        array[x - 1][y - 1] = value + diagCost;
        expandSquareRec(x - 1, y - 1, array, malla);
    }
    // ↗
    if (x > 0 && y < l - 1 && array[x - 1][y + 1] > value + diagCost && malla[x - 1][y + 1] == 0) {
        array[x - 1][y + 1] = value + diagCost;
        expandSquareRec(x - 1, y + 1, array, malla);
    }
    // ↙
    if (x < l - 1 && y > 0 && array[x + 1][y - 1] > value + diagCost && malla[x + 1][y - 1] == 0) {
        array[x + 1][y - 1] = value + diagCost;
        expandSquareRec(x + 1, y - 1, array, malla);
    }
    // ↘
    if (x < l - 1 && y < l - 1 && array[x + 1][y + 1] > value + diagCost && malla[x + 1][y + 1] == 0) {
        array[x + 1][y + 1] = value + diagCost;
        expandSquareRec(x + 1, y + 1, array, malla);
    }
    return array;
}
