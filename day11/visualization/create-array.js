/*
*   Function to create an n-dimensional array
*
*   @param array dimensions
*   @param any type value
*
*   @return array array
 */
function createArray(dimensions, value) {
    // Create new array
    var array = new Array(dimensions[0] || 0)
    var i = dimensions[0]

    // If dimensions array's length is bigger than 1
    // we start creating arrays in the array elements with recursions
    // to achieve multidimensional array
    if (dimensions.length > 1) {
        // Remove the first value from the array
        var args = Array.prototype.slice.call(dimensions, 1)
        // For each index in the created array create a new array with recursion
        while (i--) {
            array[dimensions[0] - 1 - i] = createArray(args, value)
        }
        // If there is only one element left in the dimensions array
        // assign value to each of the new array's elements if value is set as param
    } else {
        if (typeof value !== 'undefined') {
            while (i--) {
                array[dimensions[0] - 1 - i] = value
            }
        }
    }

    return array
}

// console.log(createArray([]))            // [] or new Array()
// console.log(createArray([2], 'empty'))  // ['empty', 'empty']
// console.log(createArray([3, 2], 0))     // [[0, 0],
//                                         //  [0, 0],
//                                         //  [0, 0]]
