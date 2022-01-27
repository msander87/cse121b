export const PI = 3.145926;


function square(x) {
    return x * x;
}
export {square};



const stats = {
    square(x) {
        return x * x;
    },
    sum(array, callback) {
        if (callback) {
            array = array.map(callback);
        }
        return array.reduce((a, b) => a + b);
    },
    mean(array) {
        return this.sum(array) / array.length;
    },
    variance(array) {
        return this.sum(array, this.square) / array.length - this.square(this.mean(array))
    }
}
export {stats};

//module.exports = x => x * x;