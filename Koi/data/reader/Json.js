Koi.define('Koi.data.reader.Json', {
    extends:'Koi.data.Reader',
    alias:'json',

    read:function (value) {
        return JSON.parse(value);
    }

});