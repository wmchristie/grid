(function (app, $, _, undefined) {
    'use strict';

    // The following styles can be added the the grouping functionality is added via extension:
    //groupLastColumnStyle = 'border-right:1px solid #9da6b2; margin-right:0; padding-right:7px;', 
    //
    
    app.gridCss = function (gridId, columns) {

        var rules,
            cssWriter,
            template = app.gridTemplates.gridCss;

        cssWriter = app.cssWriter(template({
            gridId : gridId,
            columns : columns.getWidthInfos()
        }));

        rules = cssWriter.rulesAsjQuery();
        
        return {
            rules : rules
        };
    };

    app.CssRuleBuilder = function () {
        this.clear();
    };

    app.CssRuleBuilder.prototype = {

        _rules : {},
        _additionalRules : '',

        additionalRules : function () {
            return this._additionalRules;
        },

        addRuleFactory : function (name, factory) {
            this._rules[name] = factory;
        },

        clear : function () {
            this._rules = {};
            delete this._selectorFactory;
        },

        rules : function (item) {

            var rules = '';

            _.each(this._rules, function (factory, key) {
                rules += key + ': ' + factory(item) + '; ';
            });

            return rules;

        },

        selector : function (item) {
            return this._selectorFactory(item);
        },

        setAdditionalRules : function (rules) {
            this._additionalRules = rules;
        },

        setSelectorFactory : function (factory) {
            this._selectorFactory = factory;
        }

    };
/*
                '<% _.each(data.items, function (item) { %>' +
                '    <%= this.selector(item) %> { <%= this.rules(item) %>}\r\n' +
                '<% }, this); %>' +
                '<%= this.additionalRules() %>' +
*/

}(window.app || (window.app = {}), jQuery, _));
