(function (app, $, _, undefined) {
    'use strict';

    app.cssWriter = function (css) {

        var id = _.uniqueId('custom_style_'),
            element,
            api;

        api = {

            destroy : function () {

                if (element) {
                    element.remove();
                    element = null;
                }

                this.rules = null;

            },

            id : id,

            rules : [],

            rulesAsjQuery : function () {

                var result = [],
                    rules = this.rules,
                    i, 
                    limit;

                for (i = 0, limit = rules.length; i < limit; i++) {
                    result[i] = $(rules[i]);
                }

                return result;

            },

            update : function (source) {

                var stylesheets,
                    stylesheet,
                    markup,
                    i, 
                    limit;

                if (element) {
                    element.remove();
                }

                markup = '<style id="' + id + '" type="text/css">\r\n';
                markup += source;
                markup += '</style>\r\n';

                element = $(markup).appendTo($('head'));

                stylesheets = document.styleSheets;

                for (i = 0, limit = stylesheets.length; i < limit; i++) {

                    stylesheet = stylesheets[i];

                    if (stylesheet.id === id || (stylesheet.ownerNode && stylesheet.ownerNode.id === id)) {
                        break;
                    } else if (i === limit - 1) {
                        throw 'could not find the stylesheet that we created: id = ' + id;
                    }

                }

                this.rules = stylesheet.cssRules || stylesheet.rules;

            }

        };

        api.update(css);

        return api;

    };

}(window.app, jQuery, _));
