/**
 * This class handles a rest endpoint
 */
Koi.define('Koi.data.endpoint.Rest', {
    extends:'Koi.data.Endpoint',
    alias:'rest',

    url:undefined,

    cacheable:true,

    reader:undefined,

    connection:undefined,

    constructor:function () {
        var me = this;

        me.connection = Koi.instantiate('Koi.Connection');
    },

    get:function (id) {
        var me = this,
            uri = me.url;

        if (id) {
            uri = uri + '/' + id;
        }
        me.connection.send(uri, 'GET', null, function (status, response) {
            if (me.fire(me.reader.read(response))) {
                //TODO:FINISH THIS MOTHERFUCKER
            }
        }, me);

    },

    post:function () {

    },

    put:function (id) {

    },

    delete:function (id) {

    }


});
