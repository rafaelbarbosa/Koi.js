Koi.define('examples.data.model.User', {
    extends:'Koi.data.Model',

    fields:{
        username:{},
        name:{}
    },

    constructor:function () {
        this.callParent();
    }
});