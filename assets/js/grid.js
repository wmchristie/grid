(function (app, $, _, undefined) {

    _.templateSettings.variable = 'item';

    app.gridTemplates = {
        value : _.template('<td class="col<%= item.c %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),
        anchor : _.template('<td class="col<%= item.c %>"><div class="data"><span><a href="" title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></a></span></div></td>'),
        rowLabel : _.template('<td class="branch" colspan="<%= item.colspan %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),
        twisty : _.template('<td class="twisty"><div class="data"><span><button type="button" data-record="<%= item.row %>" class="<%= item.state %> image twisty"><div class="body"><div class="west side"></div><div class="east side"></div><b></b></div></button></span></div></td>'),
        blank : _.template('<td class="col<%= item.c %>"><div class="data"><span></span></div></td>'),

        head : _.template(
            '<th class="col<%= item.ordinal %><%= item.sizable %><%= item.sortable %><%= item.sort %>">' +
            '    <div class="cell">' +
            '        <div class="side west"></div>' +
            '        <div class="data">' +
            '            <span>' +
            '                <span><%= item.name %></span>' +
            '                <div class="sort-indicator"></div>' +
            '                <div class="sort-order-indicator"><%= item.sortIndicator %></div>' +
            '            </span>' +
            '        </div>' +
            '        <div class="side east"></div>' +
            '    </div>' +
            '</th>'
        ),

        headGroup : _.template('<th></th>')
    };

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

            cssRuleBuilder = new app.CssRuleBuilder();

            cssWriter = new app.CssWriter(),

            scrollSizer = new app.GridScrollSizer({
                element : dom.scrollSizer(),
                rowHeight : rowHeight
            }),
            
            render = app.gridRender(dom, columns, rowMarkup, headMarkup);

        cssRuleBuilder.addRuleFactory('width', function (item) {
            return item.data + 'px'
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

}(window.app || (window.app = {}), jQuery, _))
