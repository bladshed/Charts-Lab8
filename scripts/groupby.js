var groupBy = function(data, key) {
    // data {
    //     amount:
    //     month:
    // }
    return data.reduce(function(storage, item) {
        // month values are int, ex 1 for Feb
        // item[month]
        // group will have integer number value
        var group = item[key];
    
        // will group same months together
        // creates object like storage[2] for march
        storage[group] = storage[group] || [];
    
        // ex. storage[1] will have an array of values of all febs
        //     storage[2] will have an array of values of all march
        // will look like this:
        // storage {
        //     0: array[janObjs],
        //     1: array[febObjs]
        // }
        storage[group].push(item);
    
        // return the updated storage to the reduce function, which will then loop through the next
        return storage;
    }, {}); // {} is the initial value of the storage
};