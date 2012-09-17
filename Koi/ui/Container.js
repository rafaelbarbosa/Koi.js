Koi.define('Koi.ui.Container', {
    extends:'Koi.ui.Component',
    alias:'container',

    layout:{},

    items:[],

    el:undefined,


    init:function () {
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
    },

    child:function (selector) {
        if (selector === undefined) {
            return [this.items[0]];
        }

        var selectorParts = selector.split(' '),
            firstSelector = selectorParts[0],
            firstBracket = firstSelector.indexOf('['),
            lastBracket = firstSelector.indexOf(']'),
            subSelectors = [],
            selectedItems = [];

        if (firstBracket > -1 && lastBracket > -1) {
            var subSelectorString = firstSelector.slice(firstBracket + 1, lastBracket),
                subSelectorStringParts = subSelectorString.split(',');
            for (var i = 0; i < subSelectorStringParts.length; i++) {
                var subSelectorParts = subSelectorStringParts[i].split('=');
                subSelectors.push({property:subSelectorParts[0], value:subSelectorParts[1]});
            }
            firstSelector = firstSelector.slice(0, firstBracket);
        }

        Koi.each(this.items, function (index, item, allItems) {
            if (item.type === firstSelector && subSelectors.length === 0) {
                selectedItems.push(item);
            }
            if (item.type === firstSelector && subSelectors.length >= 0) {

                for (var subSelectorKey in subSelectors) {
                    if (!item.hasOwnProperty(subSelectors[subSelectorKey].property)) {
                        return;
                    }
                    if (item[subSelectors[subSelectorKey].property] !== subSelectors[subSelectorKey].value) {
                        return;
                    }
                }
                selectedItems.push(item);
            }
        });
        if (selectorParts.length > 1) {
            selectorParts.shift();
            var shiftedSelector = selectorParts.join(' '),
                subSelectedItems = new Array();
            Koi.each(selectedItems, function (index, item, allItems) {
                if (item.hasOwnProperty('child')) {
                    subSelectedItems = subSelectedItems.concat(item.child(shiftedSelector));
                }
            });
            selectedItems = subSelectedItems;
        }
        var keys = {},
            tempItems = [];

        Koi.each(selectedItems, function (index, selItem, allSelItems) {
            if (!keys.hasOwnProperty(selItem.id)) {
                keys[selItem.id] = true;
                tempItems.push(selItem);
            }
        });

        return tempItems;


    }


});
