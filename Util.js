// Function to merge two sorted parts of array
function merge(arr, left, middle, right) {

    // Length of both sorted aub arrays
    let l1 = middle - left + 1;
    let l2 = right - middle;
    // Create new subarrays
    let arr1 = new Array(l1);
    let arr2 = new Array(l2);

    // Assign values in subarrays
    for (let i = 0; i < l1; ++i) {
        arr1[i] = arr[left + i];
    }
    for (let i = 0; i < l2; ++i) {
        arr2[i] = arr[middle + 1 + i];
    }

    // To travesrse and modify main array
    let i = 0,
    j = 0,
    k = left;

    // Assign the smaller value for sorted output
    while (i < l1 && j < l2) {
        if (arr1[2][i] < arr2[2][j]) {
            arr[k] = arr1[i];
            ++i;
        } else {
            arr[k] = arr2[j];
            j++;
        }
        k++;
    }
    // Update the remaining elements
    while (i < l1) {
        arr[k] = arr1[i];
        i++;
        k++;
    }
    while (j < l2) {
        arr[k] = arr2[j];
        j++;
        k++;
    }
}

// Function to implement merger sort in javaScript
function mergeSortByDistance(arr, left, right) {
    if (left >= right) {
        return;
    }

    // Middle index to create subarray halves
    let middle = left + parseInt((right - left) / 2);

    // Apply mergeSort to both the halves
    mergeSortByDistance(arr, left, middle);
    mergeSortByDistance(arr, middle + 1, right);

    // Merge both sorted parts
    merge(arr, left, middle, right);
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        // Mover los elementos de arr[0..i-1] que son mayores que key
        // una posición adelante de su posición actual
        while (j >= 0 && arr[j][2] > key[2]) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function cloneArray(array) {
    return array.map(subarray => [...subarray]); // Proper deep copy
}

