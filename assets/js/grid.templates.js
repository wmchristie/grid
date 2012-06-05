// this file must appear first in the load order after the 'app' file(s)
(function (app, $, _, undefined) {
    'use strict';

    var grid = app.ui.grid;

    _.templateSettings.variable = 'item';

    grid.templates = {

        value : _.template('<td class="col<%= item.c %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),
        anchor : _.template('<td class="col<%= item.c %>"><div class="data"><span><a href="" title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></a></span></div></td>'),
        rowLabel : _.template('<td class="branch" colspan="<%= item.colspan %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),

        // todo : move this out into the twisty module
        twisty : _.template(
            '<td class="twisty">' +
            '   <div class="data">' +
            '       <span>' +
            '           <button type="button" data-record="<%= item.row %>" class="<%= item.state %> image twisty">' +
            '               <div class="body"><div class="west side"></div><div class="east side"></div><b></b></div>' +
            '           </button>' +
            '       </span>' +
            '   </div>' +
            '</td>'
        ),

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

        headGroup : _.template('<th></th>'), // todo : rename this to 'group'

        css : _.template(
            '<% _.each(item.columns, function (col) { %>' +
            '   #<%= item.gridId %> .col<%= col.index %> .data { width: <%= col.data %>px; text-align: <%= col.align %>; }' +
            '<% }); %>'
        )

    };

}(window.app || (window.app = {}), jQuery, _));
