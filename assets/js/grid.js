// this file must appear first in the load order after the 'app' file(s)
(function (app, $, _, undefined) {
    'use strict';

    var ui = app.ui,
        grid = ui.grid = {};

    ui.Grid = function (options) {
        this._initialize(options);

    };

    ui.Grid.prototype = {

        destroy : function () {

            (this._dom && this._dom.destroy());
            (this._columns && this._columns.destroy());

            this._columns = this._dom = this._container = this._$container = null;

        },

        data : function (rows) {
        },

        options : function (options) {

            if (options == null) {
                return this._options;
            }

            _.extend(this._options, options);
            this._applyOptions(options);

            return this;

        },

        _applyOptions : function (options) {

        },

        _default : {
            cellPadding : 19,
            rowHeight : 25
        },

        _initialize : function (options) {
        
            this._options = {};
            this.options(_.extend({}, this._default, options));

            this._$container = $(options.element); // jQuery wrapped container
            this._container = this._$container[0];

            this.id = this._container.id || (this._container.id = _.uniqueId('grid'));
            this._dom = grid.dom(this._$container);

        }

    };

/*

    var markupTime,
        insertTime,

        rowHeight = 25,
        cellPadding = 19,

        colStart = 0,

        container = document.getElementById('grid_container'),

        gridId = container.id || (container.id = _.uniqueId('grid')),

        rowMarkup = new app.RowFactory(rowHeight).create(app.data.records), 
        headMarkup = new app.HeadFactory().create(app.data.primaryView),
        dom = app.gridDom(container),

        columns = new app.GridColumns(app.data.primaryView.columns, cellPadding),

        scrollSizer = new app.GridScrollSizer({
            element : dom.scrollSizer(),
            rowHeight : rowHeight
        }),
        
        render = app.gridRender(dom, columns, rowMarkup, headMarkup),
        
        css = app.gridCss(gridId, columns);

    //columns.setCssRules(css.getRules());

    scrollSizer.sizeToColumns(columns.getWidthInfos());
    scrollSizer.sizeToRows(rowMarkup);

    render.show();

*/
}(window.app, jQuery, _));
