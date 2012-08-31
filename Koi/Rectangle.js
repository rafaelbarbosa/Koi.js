Koi.define('Koi.Rectangle', {
    extends:'Koi.Entity',
    alias:'rectangle',

    fillStyle:'red',

    update:function (interval) {
    },


    render:function (context) {
        var me = this;
        context.fillStyle = me.fillStyle;
        context.fillRect(me.x, me.y, me.width, me.height);
    }




});
