(function (app, $, _, undefined) {

    _.templateSettings.variable = 'item';

    app.gridTemplates = {
        value : _.template('<td class="col<%= item.c %>"><div class="data"><span><%= item.value %></a></span></div></td>'),
        rowLabel : _.template('<td class="branch" colspan="<%= item.span %>"><div class="data"><span title="<%= item.value.replace(this.titleRegex, "") %>"><%= item.value %></span></div></td>'),
        twisty : _.template('<td class="twisty"><div class="data"><span><button type="button" data-record="<%= item.row %>" class="<%= item.state %> image twisty"><div class="body"><div class="west side"></div><div class="east side"></div><b></b></div></button></span></div></td>'),
        blank : _.template('<td class="col<%= item.c %>" colspan=""><div class="data"><span></span></div></td>')
    };

    app.LabelRow = function (item, offset) {

        this.offset = offset;
        this.value = item.value;
        this.values = item.values;
        this.max = this.offset + this.values.length;

    };

    app.LabelRow.prototype = {

        titleRegex : /<[a-z\/][^>]*>/g,

        before : app.gridTemplates.rowLabel,
        template : app.gridTemplates.value,

        col : function (i, count) {

            var result = '',
                max = this.max, 
                offset = this.offset,
                template = this.template,
                values = this.values,
                limit,
                v;

            if (i < this.offset) {

                result = this.before({ 
                    span : (i + count) > offset ? offset - i : count,
                    value : i === 0 ? this.value : ''
                });

            } 

            i += count;
            v = i - offset;
            limit = Math.min(max, count);

            while (i < max && i < count) {

                result += template({
                    c : i++,
                    value : values[v++]
                });

            }

            template = this.after;

            while (i < count) {
                result += template({ c : i++ });
            }

            return result;

        }

    };

    app.Row = function (item, offset) {

        this.offset = offset;
        this.value = item.value;
        this.values = item.values;
        this.max = this.offset + this.values.length;

    };

    app.Row.prototype = {

        titleRegex : /<[a-z\/][^>]*>/g,

        before : app.gridTemplates.blank,
        after : app.gridTemplates.blank,
        template : app.gridTemplates.value,

        col : function (i, count) {

            var result = '',
                max = this.max, 
                offset = this.offset,
                template = this.before,
                values = this.values,
                v,
                limit = Math.min(offset, count);

            while (i < limit) { // we can reduce this to a single test using Math.min()
                result += template({ c : i++ });
            }

            template = this.template;
            v = i - offset;
            limit = Math.min(max, count);

            while (i < limit) {

                result += template({
                    c : i++,
                    value : values[v++]
                });

            }

            template = this.after;

            while (i < count) {
                result += template({ c : i++ });
            }

            return result;

        }

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

                result[this.i++] = new (record.value.length > 0 ? app.LabelRow : app.Row)(record, offset);

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

    foo = function (markup, tbody, table) {

        var m = '<table>';
        m += markup;
        m += '</table>'

        var div = document.createElement('div');

        div.innerHTML = m;
        return table.replaceChild(div.firstChild.firstChild, table.firstChild);

    };



    $(function () {

        var body = $('tbody')[0];
        var table = $('table')[0];

        var markupTime;
        var insertTime;

        var factory = new app.RowFactory();

        var rows = factory.create(app.data.records);

        var start = new Date();

        var list = '';

        for (var i = 0; i < rows.length; i++) {

            list += '<tr';

            if (i % 2 !== 0) {
                list += ' class="odd"'; 
            }

            list += '>';

            list += rows[i].col(0, 8);

            list += '</tr>';

        }

        markupTime = new Date().getTime() - start.getTime();

        start = new Date();

        body = foo(list, body, table);

        insertTime = new Date().getTime() - start.getTime();

        console.log(markupTime, ' ', insertTime, ' ', markupTime + insertTime);

    });

}(window.app || (window.app = {}), jQuery, _))
