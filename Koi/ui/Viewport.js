Koi.define('Koi.ui.Viewport', {
    extends:'Koi.ui.Container',
    alias:'viewport',


    title:'',

    constructor:function (config) {
        var me = this;


        me.el = window.document.getElementsByTagName('body')[0];


        me.el.setAttribute('class', 'koi-body');


        this.callParent(arguments);

        this.render(me.el);
    },
    setTitle:function (title) {
        window.document.title = title;
    }




});
