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

    app.gridStyle = function (gridId, widthInfos) {

        var id = _.uniqueId('gridstyle'),

            stylesheet,

            //groupLastColumnStyle = 'border-right:1px solid #9da6b2; margin-right:0; padding-right:7px;', 

            setWidth,
            cssRules,
            template;
        
        template = _.template(
            '<style id="<%= item.id %>" type="text/css">\r\n' +
            '<% _.each(item.widthInfos, function (widthInfo) { %>' +
            '    #<%= item.gridId %> .col<%= widthInfo.index %> .data { width: <%= widthInfo.data %>px; }\r\n' +
            '<% }); %>' +
            //'    #<%= item.gridId %> .branch .data {}\r\n' +
            '</style>\r\n'
        );

            
        if (widthInfos.length === 0) {
            return;
        }

        stylesheet = $(template({
            id : id,
            gridId : gridId,
            widthInfos : widthInfos
        })).appendTo($('head'));

        _.each(document.styleSheets, function (sheet) {
        
            if (sheet.id === id || (sheet.ownerNode && sheet.ownerNode.id === id)) {
                cssRules = sheet.cssRules ? sheet.cssRules : sheet.rules; 
            }

        });

        setWidth = function (w) {
            this.rule.css('width', w);
        };

        _.each(widthInfos, function (widthInfo, i) {
            widthInfo.rule = $(cssRules[i]);
        });

        //this._branchStyles = $(_.last(cssRules));
    

        return {

            rules : function () {
                return cssRules;
            },

            destroy : function () {
                stylesheet.remove();
                stylesheet = null;
            }

        };

    };

    $(function () {

        var markupTime,
            insertTime,

            colStart = 0,

            container = document.getElementById('grid_container'),

            gridId = container.id || (container.id = _.uniqueId('grid')),

            rowMarkup = new app.RowFactory().create(app.data.records), 
            headMarkup = new app.HeadFactory().create(app.data.primaryView),
            dom = app.gridDom(container),

            columns = new app.GridColumns(app.data.primaryView.columns, 19),

            stylesheet = app.gridStyle(gridId, columns.getWidthInfos()),

            scrollSizer = new app.GridScrollSizer({
                element : dom.scrollSizer(),
                rowHeight : 25
            }),
            
            render = app.gridRender(dom, columns, rowMarkup, headMarkup);

        columns.setCssRules(stylesheet.rules());

        scrollSizer.sizeToColumns(columns.getWidthInfos());
        scrollSizer.sizeToRows(rowMarkup);

        render.show();

    });

}(window.app || (window.app = {}), jQuery, _))
