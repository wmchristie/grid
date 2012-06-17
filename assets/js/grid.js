// this file must appear first in the load order after the 'app' file(s)
(function (app, $, _, undefined) {
    'use strict';

    var ui = app.ui,
        grid = ui.grid = {};

    ui.Grid = function (options) {

        this._options = {};
        this.options(options);
        this.options(this._default);

        this._$container = $(options.element);
        this._container = this._$container[0];

        this.id = this._container.id || (this._container.id = _.uniqueId('grid'));
        this._dom = grid.dom(this._$container);

    };

    ui.Grid.prototype = {

        destroy : function () {

            (this._dom && this._dom.destroy());

            this._dom = null;
            this._container = null;

        },

        data : function (rows) {
        },

        options : function (options) {

            if (options != null) {

                $.extend(this._options, options);
                this._applyOptions(options);

            }

            return this._options;

        },

        _applyOptions : function (options) {

        },

        _default : {
            cellPadding : 19,
            rowHeight : 25
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
