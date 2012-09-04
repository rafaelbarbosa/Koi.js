Koi.define('Koi.data.Store', {

    model:undefined,

    primaryKey:undefined,

    endpoint:undefined,


    /**
     * if true the store loads on initialization
     */
    autoLoad:false,

    constructor:function () {
        var me = this;
        if (me.model === undefined) {
            throw Koi.Exception('endpoint must be defined');
        }
        if (me.endpoint === undefined) {
            throw Koi.Exception('endpoint must be defined');
        }

        var endpointInstance = Koi.instantiate(me.endpoint.type, me.endpoint);

        delete me.endpoint;
        me.endpoint = endpointInstance;

        me.endpoint.on('get', me.loadRaw, me, false);

        if (me.autoLoad) {
            me.load();
        }
    },


    records:[],

    /**
     * returns the index of the first found record or -1 if it doesnt find any record
     * @param attribute the field attribute
     * @param value the value to look for
     * @optional
     * @param caseSensitive case sensitive to make the search case sentitive
     * @default false
     * @optional
     * @param  anyMatch to make the search be contains
     * @default false
     * @returns the index of the found record or -1 if no record is found;
     */
    find:function (attribute, value, caseSensitive, anyMatch) {
        var me = this,
            recordIndex = -1,
            caseSensitive = caseSensitive || false,
            anyMatch = anyMatch || false;

        if (!caseSensitive) {
            value = value.toLowerCase();
        }

        Koi.each(me.records, function (item, index, allItems) {
            var recordValue = item.get(attribute);

            if (!caseSensitive) {
                recordValue = recordValue.toLocaleLowerCase();
            }

            if (!anyMatch) {
                if (recordValue === value) {
                    recordIndex = index;
                }
            }
            else {
                if (recordValue.indexOf(recordValue)) {
                    recordIndex = index;
                }
            }
            return false;
        });
        return recordIndex;
    },

    load:function (callback) {
        var me = this,
            endpoint = me.endpoint;
        endpoint.doGet(callback);
    },

    loadRaw:function (rawData) {
        var me = this;
        Koi.each(rawData, function (index, data, allData) {
            me.add(data);
        });
    },

    add:function (data) {
        var me = this,
            recordInst;
        debugger;
        recordInst = Koi.instantiate(me.model, {});


        Koi.each(data, function (key, value, allValues) {
            debugger;
            recordInst.set(key, value);
        });

        me.records.push(recordInst);
    }


});
