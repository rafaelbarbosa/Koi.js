Koi.define('Koi.Connection', {

    req:undefined,

    constructor:function () {
        var me = this;
        if (window.XMLHttpRequest) {
            me.req = new XMLHttpRequest();
        }
        else {
            me.req = new ActiveXObject("Microsoft.XMLHTTP");
        }
    },

    send:function (url, method, data, callback, scope) {
        var me = this;

        me.req.open(method, url, false);
        me.req.onreadystatechange = function () {

            if (me.req.readyState === 3) {
                me.fire('downloading');
            }
            if (me.req.readyState === 4) {
                me.fire('ready', me.req.status);
                callback.call(scope, me.req.status, me.req.response);
            }
        }
        me.req.send(data);
    }
});
