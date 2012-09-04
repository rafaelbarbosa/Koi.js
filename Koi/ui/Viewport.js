Koi.define('Koi.ui.Viewport', {
    extends:'Koi.ui.Container',
    alias:'viewport',


    title:'',

    constructor:function (config) {
        var me = this,
            headEl,
            bootstrapStylesheet;


        me.el = window.document.getElementsByTagName('body')[0];

        headEl = window.document.getElementsByTagName('head')[0];

        bootstrapStylesheet = document.createElement('link');

        bootstrapStylesheet.setAttribute('rel', 'stylesheet');
        bootstrapStylesheet.setAttribute('href', 'css/bootstrap.min.css');

        headEl.appendChild(bootstrapStylesheet);

        me.el.setAttribute('class', 'koi-body');

        me.setTitle(me.title);

        this.callParent(arguments);

        this.render(me.el);
    },
    setTitle:function (title) {
        window.document.title = title;
    }




});
