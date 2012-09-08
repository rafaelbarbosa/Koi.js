Koi.define('Koi.data.Store', {

    model:undefined,

    primaryKey:undefined,

    endpoint:undefined,

    records:undefined,


    /**
     * if true the store loads on initialization
     */
    autoLoad:false,

    constructor:function (config) {

        if (this.model === undefined) {
            throw Koi.Exception('endpoint must be defined');
        }
        if (this.endpoint === undefined) {
            throw Koi.Exception('endpoint must be defined');
        }

        var endpointInstance = Koi.instantiate(this.endpoint.type, this.endpoint);

        delete this.endpoint;
        this.endpoint = endpointInstance;

        this.endpoint.on('get', this.loadRaw, this, false);

        if (this.autoLoad) {
            this.load();
        }


    },


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
        me.fire('load', me.records);
    },

    add:function (data) {
        var me = this,
            recordInst;
        recordInst = Koi.instantiate(me.model, {});
        Koi.each(data, function (key, value, allValues) {
            recordInst.set(key, value);
        });
        if (!Koi.isDefined(me.records)) {
            me.records = new Array();
        }
        me.records.push(recordInst);
    },
    remove:function (record) {
        record.fire('removed');
        delete this.records[record];
    },
    removeAt:function (index) {
        var record = this.records[index];
        record.fire('removed');
        delete this.records[index];

    },
    removeAll:function () {
        if (Koi.isDefined(this.records)) {
            Koi.each(this.records, function (index, record, allRecords) {
                record.fire('removed');
                record.destroy();
                allRecords[index] = undefined;
            });
            this.records = new Array();
        }

    }


});
