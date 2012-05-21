(function (app, $, _, undefined) {

    _.templateSettings.variable = 'item';

    app.gridTemplates = {
        value : _.template('<td class="col<%= item.c %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),
        anchor : _.template('<td class="col<%= item.c %>"><div class="data"><span><a href="" title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></a></span></div></td>'),
        rowLabel : _.template('<td class="branch" colspan="<%= item.colspan %>"><div class="data"><span title="<%= item.value.replace(item.regex, "") %>"><%= item.value %></span></div></td>'),
        twisty : _.template('<td class="twisty"><div class="data"><span><button type="button" data-record="<%= item.row %>" class="<%= item.state %> image twisty"><div class="body"><div class="west side"></div><div class="east side"></div><b></b></div></button></span></div></td>'),
        blank : _.template('<td class="col<%= item.c %>"><div class="data"><span></span></div></td>')
    };

    app.createRow = function (item, offset) {

        var value = item.value,
            values = item.values,
            max = offset + values.length,

            hasRowLabel = value.length > 0,

            min = Math.min,
            
            label = app.gridTemplates.rowLabel,
            before = app.gridTemplates.blank,
            during = app.gridTemplates.value,
            after = app.gridTemplates.blank,

            titleRegex = /<[a-z\/][^>]*>/g;

        return {

            col : function (i, count) {

                var result = '',
                    template,
                    maxLimit = i + count,
                    colspan,
                    v;

                if (i === 0 && hasRowLabel) { // todo : how do we set the total width of the colspan'ed cells when only row labels are being displayed

                    colspan = min(count, offset - i);

                    result = label({ 
                        regex : titleRegex,
                        colspan : colspan,
                        value : value
                    });

                    i += colspan;

                } 

                if (i >= maxLimit) {
                    return result;
                }

                limit = min(offset, maxLimit);
                template = before;

                while (i < limit) { 
                    result += template({ c : i++ });
                }

                if (i >= maxLimit) {
                    return result;
                }

                v = i - offset;
                limit = min(max, maxLimit);
                template = during;

                while (i < limit) {

                    result += template({
                        regex : titleRegex,
                        c : i++,
                        value : values[v++]
                    });

                }

                if (i >= maxLimit) {
                    return result;
                }

                template = after;

                while (i < maxLimit) {
                    result += template({ c : i++ });
                }

                return result;

            }


        };

    };

    app.RowFactory = function () {};
    app.RowFactory.prototype = {

        addRecords : function (records, offset, result) {

            var i = 0,
                limit = records.length,
                record,
                nextOffset;

            if (limit === 0) {
                return;
            }

            nextOffset = offset + records[0].values.length;

            for (; i < limit; i++) {

                record = records[i];

                result[this.i++] = app.createRow(record, offset);

                if (record.nodes) {
                    this.addRecords(record.nodes, nextOffset, result);
                }

            }

        },

        create : function (records, count) {

            var result = new Array(count);

            this.i = 0;

            this.addRecords(records, 0, result);

            return result;

        }

    };

    writeTable = function (markup, table) {

        var m = '<table>',
            body = table.childNodes[0];

        m += markup;
        m += '</table>'

        var div = document.createElement('div');

        div.innerHTML = m;

        var newBody = div.childNodes[0].childNodes[0];

        return table.replaceChild(newBody, body);

    };

    var table = $('table')[0];

    var show = function (rows, colStart) {

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

        writeTable(list, table);

        insertTime = new Date().getTime() - start.getTime();

        console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

    };


    $(function () {

        var markupTime;
        var insertTime;

        var factory = new app.RowFactory();

        var rows = factory.create(app.data.records);

        var colStart = 0;

        show(rows, colStart++);

        $('#by_cell').on('click', function () {
            show(rows, colStart++);
        });

    });

}(window.app || (window.app = {}), jQuery, _))
