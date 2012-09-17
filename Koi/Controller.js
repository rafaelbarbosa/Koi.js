Koi.define('Koi.Controller',{
    alias:'controller',

    viewport:undefined,
    accessors:undefined,

    init:function(config){
        var me = this;
        Koi.each(me.accessors,function(key,item,allItems){
            me['get'+Koi.capitalize(key)] = function(){
                return me.viewport.child(item).pop();
            };
        });

    },

    controller:function(){},

    handle:function(handlers){
        var me = this;
        Koi.each(handlers,function(key,handler,allHandlers){
            if(Koi.isDefined(me.accessors) && me.accessors.hasOwnProperty(key)){
                key = me.accessors[key];
            }
            Koi.each(me.viewport.child(key),function(index,item,allItems){
                Koi.each(handler,function(eventName,event,allEvents){
                    item.on(eventName,event,me,false);
                });
            });
        });
    }







});
