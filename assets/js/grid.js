(function (app, $, _, undefined) {
    'use strict';

    _.templateSettings.variable = 'item';

    $(function () {

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

            cssRuleBuilder = new app.CssRuleBuilder(),

            cssWriter = new app.CssWriter(),

            scrollSizer = new app.GridScrollSizer({
                element : dom.scrollSizer(),
                rowHeight : rowHeight
            }),
            
            render = app.gridRender(dom, columns, rowMarkup, headMarkup);

        cssRuleBuilder.addRuleFactory('width', function (item) {
            return item.data + 'px';
        });

        cssRuleBuilder.addRuleFactory('text-align', function (item) {
            return item.align;
        });

        cssRuleBuilder.setSelectorFactory(function (item) {
            return '#' + gridId + ' .col' + item.index + ' .data';
        });

        cssRuleBuilder.setAdditionalRules('    #' + gridId + ' .branch .data {}');

        cssWriter.create(columns.getWidthInfos(), cssRuleBuilder);

        columns.setCssRules(cssWriter.getRules());

        scrollSizer.sizeToColumns(columns.getWidthInfos());
        scrollSizer.sizeToRows(rowMarkup);

        render.show();

    });

}(window.app || (window.app = {}), jQuery, _));
