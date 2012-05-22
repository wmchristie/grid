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


    var show = function (dom, head, rows, colStart) {

        var start = new Date();

        var list = '';

        var rowCount = 21;
        var colCount = 5;

        for (var i = 0; i < rowCount; i++) {

            list += '<tr';

            if (i % 2 !== 0) {
                list += ' class="odd"'; 
            }

            list += '>';

            list += rows[i].col(colStart, colCount);

            list += '</tr>';

        }

        markupTime = new Date().getTime() - start.getTime();

        start = new Date();

        dom.writeBody(list);

        dom.writeHead(head.col(colStart, colCount));

        insertTime = new Date().getTime() - start.getTime();

        console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

    };


    $(function () {

        var markupTime,
            insertTime,

            rows = new app.RowFactory().create(app.data.records), 
            head = new app.HeadFactory().create(app.data.primaryView),
            dom = app.gridDom(document.getElementById('grid_container')),

            colStart = 0;

        show(dom, head, rows, colStart++);

        $('#by_cell').on('click', function () {
            show(dom, head, rows, colStart++);
        });

    });

}(window.app || (window.app = {}), jQuery, _))
