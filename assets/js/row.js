(function (app, $, _, undefined) {

    app.createRow = function (item) {

        var value = item.value,
            values = item.values,
            offset = item.ordinalOffset,
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

                if (i === 0 && hasRowLabel) { 

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

    app.RowFactory = function (rowHeight) {
        this._rowHeight = rowHeight;
    };
    app.RowFactory.prototype = {

        _addRecords : function (records, offset, result) {

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
                    this._addRecords(record.nodes, nextOffset, result);
                }

            }

        },

        create : function (records, count) {

            var result = new Array(count),
                rowHeight = this._rowHeight,
                
                min = Math.min,
                floor = Math.floor,
                ceil = Math.ceil;

            this.i = 0;

            this._addRecords(records, 0, result);

            result.rowHeight = function () {
                return rowHeight;
            };

            result.getRange = function (top, height) {

                return {
                    start : floor(top / rowHeight),
                    count : ceil(height / rowHeight)
                };

            };

            result.markup = function (row, rowCount, col, colCount) {

                var markup = '',
                    limit = min(row + rowCount, this.length);

                for (; row < limit; row++) {

                    markup += '<tr';

                    if (!(row & 1)) {
                        markup += ' class="odd"'; 
                    }

                    markup += '>';

                    markup += this[row].col(col, colCount);

                    markup += '</tr>';

                }

                return markup;

            };

            return result;

        }

    };


}(window.app || (window.app = {}), jQuery, _))
