Koi.define('Koi.Class', {

    events:[],

    constructor:function (config) {
        if (Koi.isDefined(this.imports)) {
            Koi.each(this.imports, function (index, item, all) {
                Koi.ClassManager.include(item);
            }, this);
        }
    },


    callParent:function (args) {
        var caller = arguments.callee.caller.$name;
        if (this.$superclass.hasOwnProperty(caller)) {
            this.$superclass[caller].call(this, args);
        }

    },

    on:function (event, fn, scope, single) {
        var events = [];
        if (!Koi.EventBus.listeners.hasOwnProperty(this.id)) {
            Koi.EventBus.listeners[this.id] = {};
        }

        if (Koi.isObject(event)) {
            Koi.each(event, function (key, ev, allEvents) {
                events.push({
                    'event':key,
                    'fn':ev.fn,
                    'scope':ev.scope,
                    'single':ev.single
                });
            });
        }
        else {
            events.push({
                'event':event,
                'fn':fn,
                'scope':scope,
                'single':single

            });
        }
        Koi.each(events, function (index, ev, allEvents) {
            if (!Koi.EventBus.listeners[this.id].hasOwnProperty(ev.event)) {
                Koi.EventBus.listeners[this.id][ev.event] = new Array();
            }
            Koi.EventBus.listeners[this.id][ev.event].push({
                "fn":ev.fn,
                "scope":ev.scope,
                "single":ev.single
            });

        }, this);

    },

    fire:function () {
        var me = this,
            listeners = Koi.EventBus.listeners,
            eventName = arguments[0],
            args = new Array();
        Koi.each(arguments, function (index, argument, allArguments) {
            args.push(argument);
        });
        args.shift();
        if (listeners.hasOwnProperty(me.id) && listeners[me.id].hasOwnProperty(eventName)) {
            Koi.each(listeners[me.id][eventName], function (index, listener, allListeners) {
                listener.fn.apply(listener.scope, args);
            });
        }

    },
    destroy:function () {
        var clean = function (obj) {
            for (var key in obj) {
                if (key === 'prototype' || key === '__proto__') {
                    continue;
                }
                var prop = obj[key];
                if ((typeof(prop) === 'object' || prop instanceof Array) && !(prop instanceof HTMLElement) && prop !== 'undefined' && !(prop instanceof XMLHttpRequest)) {
                    if (prop.hasOwnProperty('destroy')) {
                        prop.destroy();
                    } else {
                        clean(prop);
                    }
                }
                delete obj[key];
            }
        };
        delete Koi.EventBus.listeners[this.id];
        delete Koi.ObjectManager[this.id];
        clean(this);


    }

});