Koi.define('Koi.ui.Button', {
    extends:'Koi.ui.Component',
    alias:'button',

    el:undefined,

    text:'',

    style:undefined,

    size:undefined,

    block:false,


    init:function () {
        var me = this;

        me.el = document.createElement('a');

        me.el.onclick = function (mouseEvent) {
            me.fire('click');
        }
        me.el.ondblclick = function (mouseEvent) {
            me.fire('dblclick');
        }

    },

    render:function (parentEl) {
        var me = this,
            btnClass = 'btn';

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
        parentEl.appendChild(me.el);

    }

});
