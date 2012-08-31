Koi.define('Koi.Sprite', {
    extends:'Koi.Entity',
    alias:'sprite',


    src:undefined,
    image:undefined,

    constructor:function (config) {
        var me = this;
        if (Koi.isDefined(config.src) && Koi.isString(config.src)) {
            me.image = new Image();
            me.image.src = config.src;
        }
    },

    update:function (interval) {
    },
    render:function (context) {
        var me = this;
        context.drawImage(me.image, me.x, me.y);
    }

});