Koi.define('Koi.ui.Container', {
    extends:'Koi.ui.Component',
    alias:'container',

    layout:{},

    items:[],

    el:undefined,


    constructor:function () {
        var me = this,
            instantiatedItems = [];

        Koi.each(me.items, function (index, item, allItems) {
            if (!item.hasOwnProperty('type')) {
                throw Koi.Exception('An item must have a type');
            }
            instantiatedItems.push(Koi.instantiate(item.type, item));
        }, me);

        delete me.items;
        me['items'] = instantiatedItems;

    },

    render:function (parentEl) {
        var me = this;

        me.el = document.createElement("div");
        me.el.setAttribute('class', 'container');


        Koi.each(me.items, function (index, item, allItems) {
            item.render(me.el);
        }, me);

        parentEl.appendChild(me.el);
    }




});