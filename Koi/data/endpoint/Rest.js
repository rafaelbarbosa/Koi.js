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
        me.connection = Koi.instantiate('Koi.Connection', {});
        me.callParent();
    },

    doGet:function () {
        var me = this,
            id = undefined,
            callback = undefined,
            uri = me.url;

        if (arguments.length > 0 && Koi.isFunction(arguments[0])) {
            callback = arguments[0];
        }
        if (arguments.length > 1 && !Koi.isFunction(arguments[1])) {
            callback = arguments[1];
        }

        if (arguments.length > 0 && !Koi.isFunction(arguments[0])) {
            id = arguments[0];
        }


        if (id) {
            uri = uri + '/' + id;
        }
        me.fire('beforeget');
        me.connection.send(uri, 'GET', null, function (status, response) {
            me.fire('get', me.reader.read(response));
        }, me);


    },

    doPost:function (data) {
        var me = this,
            uri = me.url;

        if (id) {
            uri = uri + '/' + id;
        }
        me.fire('beforepost');
        me.connection.send(uri, 'POST', null, function (status, response) {
            me.fire('post', me.reader.read(response));
        }, me);

    },

    doPut:function (id, data) {

    },

    doDelete:function (id) {

    }


});
