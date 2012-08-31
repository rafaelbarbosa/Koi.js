/**
 * This class handles a rest endpoint
 */
Koi.define('Koi.data.endpoint.Rest', {
    extends:'Koi.data.Endpoint',

    url:undefined,

    cacheable:true,

    connection:undefined,

    constructor:function () {
        var me = this;

        me.connection = Koi.instantiate('Koi.Connection');
    },

    get:function (id) {

    },

    post:function () {

    },

    put:function (id) {

    },

    delete:function (id) {

    }


});
