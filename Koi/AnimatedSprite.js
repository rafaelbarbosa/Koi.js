Koi.define('Koi.AnimatedSprite', {
    extends:'Koi.Sprite',
    alias:'animatedsprite',

    sliceHeight:undefined,
    sliceWidth:undefined,
    animationSpeed:undefined,
    animationSpeedCounter:0,
    currentAnimationStep:0,
    numberOfAnimationSteps:undefined,

    src:undefined,
    image:undefined,

    init:function (config) {
        var me = this;
        if (Koi.isDefined(me.src) && Koi.isString(me.src)) {
            me.image = new Image();
            me.image.src = me.src;
        }
    },

    render:function (context) {

        var me = this,
            sx = me.currentAnimationStep * me.sliceWidth,
            sy = 0;

        context.drawImage(me.image, sx, sy, me.sliceWidth, me.sliceHeight, me.x, me.y, me.sliceWidth, me.sliceHeight);
        me.animationSpeedCounter = (me.animationSpeedCounter + 1) % me.animationSpeed;
        if (me.animationSpeedCounter === 0) {
            me.currentAnimationStep = (me.currentAnimationStep + 1) % me.numberOfAnimationSteps;
        }
    }

});