Koi.define('Koi.Scene', {

    entities:[],

    canvas:undefined,


    constructor:function (config) {
        var me = this;
        entityObjs = []

        Koi.each(me.entities, function (index, entity, allEntities) {
            if (Koi.isObject(entity) && entity.hasOwnProperty('type')) {
                entityObjs.push(Koi.instantiate(entity.type, entity));
            }
        }, me);
        delete me.entities;
        me.entities = entityObjs;
    },

    update:function (interval) {
        Koi.each(this.entities, function (index, entity, allentitites) {
            if (Koi.isDefined(entity.update)) {
                entity.update(interval);
            }
        }, this);
    },

    render:function (context) {

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        Koi.each(this.entities, function (index, entity, allentitites) {
            if (Koi.isDefined(entity.render)) {
                entity.render(context);
            }
        }, this);

    }




});
