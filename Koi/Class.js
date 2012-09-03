Koi.define('Koi.Class', {

    events:[],


    callParent:function (args) {
        var caller = arguments.callee.caller.$name;
        if (this.$superclass.hasOwnProperty(caller)) {
            this.$superclass[caller].call(this, args);
        }

    },

    on:function (event, fn, scope, single) {
        var me = this;
        if (!Koi.EventBus.listeners.hasOwnProperty(me.id)) {
            Koi.EventBus.listeners[me.id] = {};
        }
        if (!Koi.EventBus.listeners[me.id].hasOwnProperty(event)) {
            Koi.EventBus.listeners[me.id][event] = new Array();
        }
        Koi.EventBus.listeners[me.id][event].push({
            "fn":fn,
            "scope":scope,
            "single":single
        });
    },

    fire:function () {
        var me = this,
            listeners = Koi.EventBus.listeners,
            eventName = arguments[0],
            args = Koi.slice(arguments, 1);

        if (listeners.hasOwnProperty(me.id) && listeners[me.id].hasOwnProperty(eventName)) {
            Koi.each(listeners[me.id][eventName], function (index, listener, allListeners) {
                listener.fn.apply(listener.scope, args);
            });
        }

    }

});