Koi.define('Koi.ui.Button', {
    extends:'Koi.ui.Component',
    alias:'button',

    el:undefined,

    text:'',

    style:undefined,

    size:undefined,

    block:false,


    constructor:function () {
        var me = this;

    },

    render:function (parentEl) {
        var me = this,
            btnClass = 'btn';

        me.el = document.createElement('a');


        if (Koi.isDefined(me.style)) {
            btnClass = btnClass + ' btn-' + me.style;
        }

        if (Koi.isDefined(me.size)) {
            btnClass = btnClass + ' btn-' + me.size;
        }

        if (me.block) {
            btnClass = btnClass + ' btn-block';
        }


        me.el.className = btnClass;
        me.el.href = 'javascript:void(0)';
        me.el.innerHTML = me.text;

        me.el.onclick = function (mouseEvent) {
            me.fire('click');
        }


        parentEl.appendChild(me.el);

    }

});
