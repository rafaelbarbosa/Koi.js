var Koi = {

    EventBus:{

        listeners:{}

    },

    ClassManager:{
        id:0,
        classes:{},
        alias:{},

        loadClassFile:function (className) {
            var fileref = document.createElement('script'),
                filename = className.replace(/\./g, '/') + ".js";
            block = true;


            fileref.setAttribute('type', 'text/javascript');
            fileref.setAttribute('src', filename);

            if (typeof fileref != "undefined")
                document.getElementsByTagName('head')[0].appendChild(fileref);


        },
        include:function (className) {
            var filename = className.replace(/\./g, '/') + ".js";
            if (window.XMLHttpRequest) {
                var req = new XMLHttpRequest();
            }
            else {
                var req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            req.open("GET", filename, false);
            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    window.eval(req.responseText);
                }
            }
            req.send(null);
        },


        add:function (clazz, definition) {
            var me = this;
            console.log('Adding class ' + clazz);

            /*if(Koi.isDefined(definition['extends'])){
             console.log('Extends ' + definition['extends'])
             Koi.applyIf(this.get(definition['extends']), definition);
             }
             if(Koi.isDefined(definition['import'])){
             console.log('Imports' + definition['import'])
             Koi.each(definition['import'],function(index,item,all){
             if(!Koi.isDefined(me.classes[item])){
             me.loadClassFile(item);
             }
             });
             }*/
            if (Koi.isDefined(definition['alias'])) {
                if (Koi.isDefined(this.alias[definition['alias']])) {
                    throw Koi.Exception('Class alias [' + definition['alias'] + '] already defined for class [' + this.alias[definition['alias']] + '], cannot override');
                }
                this.alias[definition['alias']] = clazz;
            }
            this.classes[clazz] = definition;
        },
        get:function (clazz, callback) {
            if (!Koi.isDefined(this.classes[clazz])) {
                this.include(clazz);
                //throw Koi.Exception('Class '+ clazz +' is not defined');
            }
            return this.classes[clazz];

        }


    },

    application:function (definition) {
        var me = this;
        if (!me.isDefined(definition.name)) {
            throw Koi.Exception('The application must have a name');
        }
        if (!me.isDefined(definition.main)) {
            throw Koi.Exception('The application must have a main function');
        }
        if (!me.isFunction(definition.main)) {
            throw Koi.Exception('main must be a function');
        }
        if (me.isDefined(definition.imports)) {
            me.each(definition.imports, function (index, item, all) {
                me.ClassManager.include(item);
            }, me);


        }
        window[definition.name] = {name:definition.name};

        window.onload = function () {
            definition.main.call(definition);
        }

    },

    define:function (className, definition) {
        var me = this;

        if (!me.isString(className)) {
            throw Koi.Exception('className must be a string');
        }
        if (!me.isObject(definition)) {
            throw Koi.Exception('definition must be an Object');
        }
        if (!me.isDefined(definition.extends) && className != 'Koi.Class') {
            definition.extends = 'Koi.Class';
        }
        if (me.isDefined(definition.extends)) {
            definition.$superclass = me.ClassManager.get(definition.extends);
            me.applyIf(me.ClassManager.get(definition.extends), definition);
        }
        me.ClassManager.add(className, definition);
    },


    instantiate:function (className) {
        var me = this,
            classManager = me.ClassManager,
            classDefinition = {},
            inst = {};
        //Validate if classname requested is an alias, if it is return the aliased class    
        if (className.indexOf("\.") === -1 && Koi.isDefined(classManager.alias[className])) {
            className = classManager.alias[className];
        }
        classDefinition = classManager.get(className);
        me.apply(classManager.get(className), inst)
        if (me.isDefined(arguments[1])) {
            me.apply(arguments[1], inst);
        }
        if (me.isDefined(inst.constructor) && me.isFunction(inst.constructor)) {
            inst.constructor.call(inst);
        }
        inst['id'] = 'obj-' + me.ClassManager.id;
        me.ClassManager.id++;
        return inst;
    },

    /**
     * Checks if obj is defined
     * @param obj
     * @return {Boolean}
     */
    isDefined:function (obj) {
        return typeof(obj) !== 'undefined';

    },

    /**
     * Checks if obj is a string
     * @param obj
     * @return {Boolean}
     */
    isString:function (obj) {
        return typeof(obj) === 'string';
    },

    /**
     * Checks if object is an object
     * @param obj
     * @return {Boolean}
     */
    isObject:function (obj) {
        return typeof(obj) === 'object';
    },

    /**
     * Checks if obj is a function
     * @param obj
     * @return {Boolean}
     */
    isFunction:function (obj) {
        return typeof(obj) === 'function';
    },

    /**
     * Applies the configuration to a given object
     * @param obj
     * @param config
     */
    apply:function (obj, config) {
        for (var key in obj) {
            config[key] = obj[key];
            if (Koi.isFunction(config[key])) {
                config[key].$name = key;
            }
        }
    },

    /**
     * Applies the configuration to a given object if the object doesn't already have the configuration
     * @param obj
     * @param config
     */
    applyIf:function (obj, config) {
        for (var key in obj) {
            if (!Koi.isDefined(config[key])) {
                config[key] = obj[key];
                if (Koi.isFunction(config[key])) {
                    config[key].$name = key;
                }
            }
        }
    },
    /**
     * Iterates on an iterable and executes a callback function on each item
     * @param iterable the object to iterate
     * @param callback the callback function, the arguments passed will be index, the item,and the iterable
     * @param scope the scope to be executed the callback function
     */
    each:function (iterable, callback, scope) {
        var all = iterable.length,
            callbackResult = true;
        scope = scope || arguments.callee;
        if (iterable instanceof Array) {
            for (var i = 0; i < all; i++) {
                callbackResult = callback.call(scope, i, iterable[i], iterable);
                if (Koi.isDefined(callbackResult) && callbackResult === false) {
                    break;
                }
            }
        }
        else {
            for (var key in iterable) {
                callbackResult = callback.call(scope, key, iterable[key], iterable);
                if (Koi.isDefined(callbackResult) && callbackResult === false) {
                    break;
                }
            }

        }
    },
    slice:function (obj, begin, end) {
        var result;
        end = end || obj.length;

        if (obj instanceof Array) {
            result = [];
            for (var i = begin; i < end; i++) {
                result.push(obj[i]);
            }
        }
        else {
            result = {};
            i = -1;
            for (var key in obj) {
                i++
                if (i < begin) {
                    continue;
                }
                else if (i < end) {
                    result[key] = obj[key];
                }
                else {
                    break;
                }
            }

        }
        return result;
    },

    import:function (className) {
        this.ClassManager.loadClassFile(className);
    },
    capitalize:function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    Exception:function (msg) {
        //return arguments.callee.caller.toString().match(/function ([^\(]+)/)[1] + ' - ' + msg;
        return 'Koi.Exception - ' + msg;

    },

    emptyFn:function () {
    }


}
