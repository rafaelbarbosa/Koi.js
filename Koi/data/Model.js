Koi.define('Koi.data.Model', {

    data:{},

    fields:{},

    constructor:function () {
        var me = this;
        Koi.each(me.fields, function (fieldName, field, allFields) {
            me.data[fieldName] = undefined;
            if (field.hasOwnProperty('default')) {
                me.set(fieldName, field['default']);
            }
        });

    },

    /**
     * Sets a value for a given field
     * @param field
     * @param value
     */
    set:function (field, value) {
        var me = this;
        if (me.data.hasOwnProperty(field)) {
            if (me.fields[field].hasOwnProperty('converter')) {
                value = me.fields[field]['converter'].call(me, value);
            }
            me.data[field] = value;
            me.fire('updated', field, value, me);
        }
        else {
            throw Koi.Exception('Unrecognized field');
        }
    },
    /**
     * returns the value of a given field
     * @param field field to query
     * @return the field value
     */
    get:function (field) {
        return this.data[field];
    },

    save:function () {
        this.fire('beforesave');
    },
    validate:function () {
    }



});
