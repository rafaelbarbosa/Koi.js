Koi.define('Koi.ui.Grid', {
    extends:'Koi.ui.Component',
    alias:'grid',

    el:undefined,

    tbody:undefined,

    store:undefined,

    gridType:'condensed',

    columns:[],

    init:function (config) {

        var me = this;


        me.store = Koi.instantiate(me.store, {});


        me.store.on('load', me.renderItems, this, false);

        me.el = document.createElement('table');
        me.el.className = 'table table-'+ me.gridType;

    },


    render:function (parentEl) {
        var me = this,
            store = me.store,
            thead = document.createElement('thead'),
            thead_tr = document.createElement('tr'),
            tbody = document.createElement('tbody');

        thead.className = 'thead';
        tbody.className = 'tbody';


        thead.appendChild(thead_tr);

        Koi.each(me.columns, function (index, column, allColumns) {
            var th = document.createElement('th');
            th.innerHTML = column['header'];
            thead_tr.appendChild(th);
        });

        me.tbody = tbody;
        me.el.appendChild(thead);
        me.el.appendChild(tbody);
        parentEl.appendChild(me.el);
    },
    renderItems:function () {
        var me = this,
            tbody = me.tbody;

        if (tbody.hasChildNodes()) {
            while (tbody.childNodes.length >= 1) {
                tbody.removeChild(tbody.firstChild);
            }
        }
        Koi.each(me.store.records, function (index, record, allRecords) {
            var tr = document.createElement('tr');
            me.renderRow(record, tr);
            me.applyRecordListeners(record, tr);
            tbody.appendChild(tr);
        });

    },

    applyRecordListeners:function (record, row) {
        var me = this;
        record.on({
            'updated':{
                fn:function (field, value, updatedRecord) {
                    me.renderRow(updatedRecord, row);
                }
            },
            'removed':{
                fn:function (removedrecord) {
                    me.tbody.removeChild(row);
                }
            }
        });
        row.onclick = function () {
            me.fire('itemclick', record);
        }
        row.dblclick = function () {
            me.fire('itemdblclick', record);
        }
    },

    renderRow:function (record, row) {
        var me = this;
        if (row.hasChildNodes()) {
            while (row.childNodes.length >= 1) {
                row.removeChild(row.firstChild);
            }
        }

        Koi.each(me.columns, function (cindex, column, allColumns) {
            var td = document.createElement('td');
            td.innerHTML = record.get(column.mapping);
            row.appendChild(td);
        });
    }
});