Koi.define('Koi.data.Endpoint', {

    reader:undefined,


    constructor:function () {
        var me = this;

        if (Koi.isDefined(me.reader) && Koi.isString(me.reader)) {
            var readerInstance = Koi.instantiate(me.reader);
            delete me.reader;
            me.reader = readerInstance;
        }
    },


    doGet:function () {
    },

    doPost:function () {
    },

    doPut:function (id) {
    },

    doDelete:function (id) {
    }


});