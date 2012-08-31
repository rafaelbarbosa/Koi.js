Koi.define('Koi.ui.Canvas', {
    extends:'Koi.ui.Component',
    alias:'canvas',
    width:500,
    height:500,


    canvas:undefined,

    render:function (parentEl) {
        var me = this;
        me.canvas = document.createElement("canvas");
        me.canvas.setAttribute('id', 'koi-viewport');
        if (Koi.isDefined(me.width)) {
            me.canvas.setAttribute('width', me.width);
        }
        if (Koi.isDefined(me.height)) {
            me.canvas.setAttribute('height', me.height);
        }
        parentEl.appendChild(me.canvas);
        this.callParent(arguments);
    },

    getContext:function () {
        return this.canvas.getContext('2d');
    }
});