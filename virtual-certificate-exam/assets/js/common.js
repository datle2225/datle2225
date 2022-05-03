isArraysSame = (array1, array2) => {
    if (!array1 || !array2) return false;
    for (let value = 0; value < array1.length; value++) {
        if ( array2.indexOf( array1[value] ) == -1 ) {
           return false;
        }
    }
    return true;
}