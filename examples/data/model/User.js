Koi.define('examples.data.model.User', {
    extends:'Koi.data.Model',

    fields:{
        username:{},
        name:{}
    },

    init:function () {
        this.callParent();
    }
});