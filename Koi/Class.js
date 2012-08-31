Koi.define('Koi.Class', {

    events:[],
    listeners:{},

    callParent:function (args) {
        var caller = arguments.callee.caller.$name;
        if (this.$superclass.hasOwnProperty(caller)) {
            this.$superclass[caller].call(this, args);
        }

    },

    on:function (event, fn, scope, single) {
        var me = this;
        if (!me.listeners.hasOwnProperty(event)) {
            me.listeners[event] = [];
        }
        me.listeners[event].push({
            "fn":fn,
            "scope":scope,
            "single":single
        });
    },

    fire:function () {
        var me = this,
            listeners = me.listeners,
            eventName = arguments[0],
            args = Koi.slice(arguments, 1);

        if (listeners.hasOwnProperty(eventName)) {
            Koi.each(listeners[eventName], function (index, listener, allListeners) {
                listener.fn.apply(listener.scope, args);
            });
        }

    }

});