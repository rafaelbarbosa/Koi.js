Koi.define('examples.data.store.User', {
    extends:'Koi.data.Store',

    model:'examples.data.model.User',

    endpoint:{
        type:'Koi.data.endpoint.Rest',
        url:'/examples/data/users.json',
        reader:'json'
    },


    constructor:function () {
        this.callParent();
    }


});