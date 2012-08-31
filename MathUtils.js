Koi.define('MathUtils', {
    extends:'local.NumberFormatter',

    constructor:function (cool) {
        console.log(cool);
    },

    sum:function (x, y) {
        return x + y;
    },

    multiply:function (x, y) {
        return x * y;
    },


    divide:function (x, y) {
        return (x / y);
    }
});
