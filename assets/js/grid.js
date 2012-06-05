(function (app, $, _, undefined) {
    'use strict';

    var ui = app.ui;

    ui.grid = {};

    ui.Grid = function (options) {

        this._container = options.element;

    };

    ui.Grid.prototype = {

        destroy : function () {

            if (this._container) {
                this._container.empty();
            }

        },

        setData : function (rows) {
        },

        setDefinition : function (options) {
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
