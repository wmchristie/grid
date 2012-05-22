(function (app, $, _, undefined) {

    app.createColumnHead = function (columns) {

        var max,
            lookup = [],

            min = Math.min,

            titleRegex = /<[a-z\/][^>]*>/g;

        // note: column.ordinal for decorator columns are negative 
        // and negative indexes added to arrays to not increase the length
        _.each(columns, function (column) {
            lookup[column.ordinal] = column;
        });

        // we are assuming that the ordinals are sequential with no gaps, 
        // but they can be negative which is why we don't use lookup.length
        max = lookup[lookup.length - 1].ordinal;

        return {

            col : function (i, count) {

                var limit = min(i + count, max);
                    result = '';

                for (; i < limit; i++) {

                    result += template(column);

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

        create : function (columns) {

            return app.createColumnHead(_.map(columns, function (column) {

                return {
                    name : column.name,
                    ordinal : column.ordinal,
                    sortable : column.sortable ? ' sortable' : '',

                };

            }));

        }

    }

}(window.app || (window.app = {}), jQuery, _))
