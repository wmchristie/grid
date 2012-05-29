(function (app, $, _, undefined) {
    'use strict';

    app.createColumnHead = function (columns) {

        var max,
            lookup = [],

            min = Math.min,
            template = app.gridTemplates.head,

            titleRegex = /<[a-z\/][^>]*>/g;

        // note: column.ordinal for decorator columns are negative 
        // and negative indexes added to arrays to not increase the length
        _.each(columns, function (column) {
            lookup[column.ordinal] = column;
        });

        // we are assuming that the ordinals are sequential with no gaps, 
        // but they can be negative which is why we don't use the value 
        // of lookup.length to find the max.
        max = lookup[lookup.length - 1].ordinal + 1;

        return {

            col : function (col, count) {

                var limit = min(col + count, max),
                    result = '';

                for (; col < limit; col++) {

                    result += template(lookup[col]);

                }

                return result;

            }

        };

    };

    app.createGroupHead = function (columns) {

        return {

            col: function (i, count) {
            }

        };

    };

    app.HeadFactory = function () {};

    app.HeadFactory.prototype = {

        create : function (view) {

            return app.createColumnHead(_.map(view.columns, function (column) {

                return {
                    align : column.align,
                    name : column.name,
                    ordinal : column.ordinal,
                    sortable : column.sortable ? ' sortable' : '',
                    sizable : column.sizable ? ' sizable' : '',
                    sort : '',
                    sortIndicator : ''
                };

            }));

        }

    }

}(window.app || (window.app = {}), jQuery, _));
