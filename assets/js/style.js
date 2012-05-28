(function (app, $, _, undefined) {

    app.CssWriter = function (template) {

        var variableBackup;

        if (template) {

            this._template = template;

        } else {

            variableBackup = _.templateSettings.variable;
            _.templateSettings.variable = 'data';

            this._template = _.template(
                '<style id="<%= data.id %>" type="text/css">\r\n' +
                '<% _.each(data.items, function (item) { %>' +
                '    <%= this.selector(item) %> { <%= this.rules(item) %>}\r\n' +
                '<% }, this); %>' +
                '<%= this.additionalRules() %>' +
                '</style>\r\n'
            );

            _.templateSettings.variable = variableBackup;

        }

    };

    app.CssWriter.prototype = {

        create : function (data, context) {

            var stylesheet;

            if (this._styleElement) {
                this._styleElement.remove();
            }

            if (!this._id) {
                this._id = _.uniqueId('custom_style_');
            }

            this._styleElement = $(this._template.call(context, {
                id : this._id,
                data : data
            })).appendTo($('head'));

            stylesheet = _.find(document.styleSheets, function (sheet) {
                return sheet.id === this._id || (sheet.ownerNode && sheet.ownerNode.id === this._id);
            });

            this._rules = stylesheet.cssRules || stylesheet.rules;
        
        },

        destroy : function () {
            this._styleElement.remove();
            this._styleElement = null;
        },

        getRules : function () {
            return this._rules;
        }

    };



}(window.app || (window.app = {}), jQuery, _))
